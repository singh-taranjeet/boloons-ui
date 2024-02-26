"use client";
import { useWebSocket } from "@/app/lib/cutom-hooks.lib";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePlayer } from "@/app/lib/player-hook.lib";
import {
  AudioTracksKey,
  GameStep,
  QuestionType,
  SoundType,
} from "./game.types.lib";
import { gameConstants } from "./game.constants.lib";
import { urls } from "@/app/lib/constants.lib";
import { validateGame } from "./game.methods.lib";
import { useSearchParams } from "next/navigation";
import { emptyFunction } from "@/app/lib/server.lib";

let AudioTracks: SoundType | undefined;

function getAudio() {
  try {
    const gameBackgroundMusic = new Audio(
      `${urls.audio}in-progress-background.mp3`
    );
    const renderScoreBackgroundMusic = new Audio(
      `${urls.audio}after-game-end-rending-scores.mp3`
    );
    renderScoreBackgroundMusic.loop = true;
    gameBackgroundMusic.loop = true;

    const audio = {
      gameBackgroundMusic,
      renderScoreBackgroundMusic,
    };
    return audio;
  } catch (error) {
    console.log("Client Audio");
    return undefined;
  }
}

function useSound() {
  const inTrack = useRef<AudioTracksKey | undefined>();
  const sound = useRef<SoundType>();

  const stopAllAudio = useCallback(function stopAllAudio() {
    // loop and pause all
    if (inTrack.current && sound?.current?.[inTrack.current]) {
      sound?.current?.[inTrack.current].pause();
      sound.current[inTrack.current].currentTime = 0;
    }
  }, []);

  const manageAudio = useCallback(
    function manageAudio(
      name: "gameBackgroundMusic" | "renderScoreBackgroundMusic",
      action: "play" | "pause"
    ) {
      stopAllAudio();
      inTrack.current = name;
      sound?.current?.[name][action]();
    },
    [stopAllAudio]
  );

  useEffect(() => {
    if (!AudioTracks) {
      AudioTracks = getAudio();
    }
    sound.current = AudioTracks;
  }, []);
  return { stopAllAudio, manageAudio };
}

export function useMultiplayer(params: {
  score: number;
  callBack: (data: any) => void;
}) {
  const searchParams = useSearchParams();
  const id = searchParams?.get("gameId");
  const gameId = useMemo(() => {
    return id;
  }, [id]);
  const { score, callBack } = params;
  const { isValidGame, validationInProgress } = useValidateGame(
    gameId ?? "",
    gameConstants.multiPlayer.step.Started
  );
  const isMultiPlayer = useMemo(() => {
    return !!gameId;
  }, [gameId]);
  const { player } = usePlayer();
  const { socket } = useWebSocket();

  // MultiPlayer: Emit Event on score update
  useEffect(() => {
    if (gameId) {
      socket.emit(gameConstants.multiPlayer.events.gameScored, {
        gameId,
        playerId: player?.id,
        score,
      });
    }
  }, [gameId, player?.id, score, socket]);

  // Multiplayer: Listen to events on game session
  useEffect(() => {
    if (gameId && isValidGame) {
      socket.on(`${gameId}`, callBack);
    }
    return () => {
      socket.off(`${gameId}`, callBack);
    };
  }, [gameId, socket, callBack, isValidGame]);

  return {
    isMultiPlayer,
    playerId: player?.id,
    isValidGame,
    validationInProgress,
  };
}

/**
 * Returns a timer value, and function start and stop timer.
 * @param time the maximum seconds you want to run timer for.
 * @param callBack  method to be called when timer is finished.
 */
export function useTimer(time: number, callBack: () => void) {
  const [timer, setTimer] = useState(time);
  const intervalRef = useRef<any>();

  const stopTimer = useCallback(
    function stopTimer() {
      clearInterval(intervalRef.current);
      callBack();
      setTimer(0);
    },
    [callBack]
  );

  const startTimer = useCallback(
    function startTimer() {
      if (!intervalRef.current) {
        setTimeout(stopTimer, (time + 1) * 1000);
        setTimer(time);
        intervalRef.current = setInterval(() => {
          setTimer((old) => {
            return old - 1;
          });
        }, 1000);
      }
    },
    [stopTimer, time]
  );

  return {
    timer,
    startTimer,
    stopTimer,
  };
}

/**
 * Returns a timer value, and function start and stop timer.
 * @param gameTimeOut the maximum time of the game session.
 * @param createQuestions  method which returs set of questions.
 * @param isCorrectAttempt Method to check if the attemp is correct
 */
export function useGame(
  gameTimeOut: number,
  createQuestions: () => Promise<QuestionType[]>,
  isCorrectAttempt: (
    userAttempts: number[],
    correctAnswer: number
  ) => Promise<boolean | undefined>
) {
  const { manageAudio, stopAllAudio } = useSound();
  const [data, setData] = useState<QuestionType[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [gameInProgress, setGameInProgress] = useState<boolean | undefined>();
  const [scoreModalOpen, setScoreModalOpen] = useState(false);

  const correctAnswer = data?.[currentQuestion]?.correctAnswer;

  const setQuestions = useCallback(
    async function setQuestions() {
      Promise.all(await createQuestions()).then((values) => {
        setData(values);
      });
    },
    [createQuestions]
  );

  const resetGame = useCallback(
    function resetGame() {
      setQuestions();
      setCurrentQuestion(0);
      setAttempts([]);
      setScore(0);
    },
    [setQuestions]
  );

  // Pause the game when ended
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, [stopAllAudio]);

  const stopGame = useCallback(
    function stopGame() {
      setAttempts([]);
      // set game in progress false
      setGameInProgress((oldValue) => {
        if (oldValue === true) {
          manageAudio("renderScoreBackgroundMusic", "play");
          setScoreModalOpen(true);
          return false;
        }
      });
    },
    [manageAudio]
  );

  const { timer, startTimer } = useTimer(gameTimeOut, stopGame);

  const startGame = useCallback(
    function startGame() {
      resetGame();
      setGameInProgress(true);
      startTimer();
      manageAudio("gameBackgroundMusic", "play");
    },
    [manageAudio, resetGame, startTimer]
  );

  const nextQuestion = useCallback(
    function nextQuestion() {
      setAttempts([]);
      if (currentQuestion < data.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        stopGame();
      }
    },
    [currentQuestion, data.length, stopGame]
  );

  const onAttempt = useCallback(
    function onAttempt(attempt: number) {
      if (gameInProgress) {
        setAttempts([...attempts, attempt]);
      }
    },
    [gameInProgress, attempts]
  );

  // on attemp change the question and update score
  useEffect(() => {
    async function onAttempt() {
      const isCorrect = await isCorrectAttempt(attempts, correctAnswer);
      console.log("isCorrect", isCorrect);
      // undefined means all attemps are exhausted which to next question
      // true means attempt is correct
      // false means need more attempts
      if (isCorrect === undefined) {
        nextQuestion();
      } else if (isCorrect) {
        setScore(score + 5);
        nextQuestion();
      }
    }
    if (attempts.length) {
      onAttempt();
    }
  }, [attempts, score, correctAnswer, nextQuestion, isCorrectAttempt]);

  // stop game when all the questions are completed
  useEffect(() => {
    if (currentQuestion >= data.length) {
      stopGame();
    }
  }, [currentQuestion, data.length, stopGame]);

  return {
    attempts,
    score,
    currentQuestion,
    data,
    timer,
    gameInProgress,
    startGame,
    onAttempt,
    scoreModalOpen,
  };
}

export function useSwipe() {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState<
    "left" | "right" | undefined
  >();

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    setSwipeDirection(isLeftSwipe ? "left" : "right");
  };

  return { onTouchEnd, onTouchMove, onTouchStart, swipeDirection };
}

/**
 * Use to show the starting game timer. Game starting in...
 * @returns startingTimer: number
 * @requires isModalOpen : boolean If the modal is open
 */
export function useCountDownTimer(params: {
  startOnLoad?: true;
  callBack?: () => void;
  time?: number;
}) {
  const { startOnLoad = false, callBack = emptyFunction, time = 3 } = params;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const memoCallBack = useCallback(() => {
    setIsModalOpen(false);
    callBack();
  }, [callBack]);
  const { timer, startTimer } = useTimer(time, memoCallBack);

  const startCountDownTimer = useCallback(
    function startCountDownTimer() {
      setIsModalOpen(true);
      startTimer();
    },
    [startTimer]
  );

  useEffect(() => {
    if (startOnLoad) {
      setIsModalOpen(true);
      startCountDownTimer();
    }
  }, [startOnLoad, startCountDownTimer]);

  return {
    countDownTimer: timer,
    isCountDownModalOpen: isModalOpen,
    startCountDownTimer,
  };
}

export function useValidateGame(gameId: string, step: GameStep) {
  const [validationInProgress, setValidationInProgress] = useState(true);
  const [isValidGame, setIsValidGame] = useState(false);

  useEffect(() => {
    async function callValidateGame() {
      if (gameId) {
        const isValid = await validateGame({ gameId, step });
        setIsValidGame(isValid);
        setValidationInProgress(false);
      }
    }
    callValidateGame();
  }, [gameId, step]);

  return { isValidGame, validationInProgress };
}
