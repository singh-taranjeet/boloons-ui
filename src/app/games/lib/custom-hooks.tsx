"use client";
import { usePlayer, useWebSocket } from "@/app/lib/cutom-hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gameConstants } from "../sum-addict/lib/constants";
import { QuestionType } from "../sum-addict/lib/types";

function getSound() {
  try {
    const gameBackgroundMusic = new Audio("/audio/in-progress-background.mp3");
    gameBackgroundMusic.loop = true;
    const renderScoreBackgroundMusic = new Audio(
      "/audio/after-game-end-rending-scores.mp3"
    );
    renderScoreBackgroundMusic.loop = true;

    const audio = {
      gameBackgroundMusic,
      renderScoreBackgroundMusic,
    };
    return audio;
  } catch (error) {
    console.log("Client Audio");
  }
}

const Sound = getSound();

export function useMultiplayer(score: number, callBack: (data: any) => void) {
  const params = useSearchParams();
  const gameId = params?.get("gameId");
  const isMultiPlayer = !!gameId;
  const { player } = usePlayer();
  const { socket } = useWebSocket();

  // MultiPlayer: Emit Event on score update
  useEffect(() => {
    if (gameId && isMultiPlayer) {
      socket.emit(gameConstants.multiPlayer.events.gameScored, {
        gameId,
        playerId: player?.id,
        score,
      });
    }
  }, [gameId, player?.id, score, socket, isMultiPlayer]);

  // Multiplayer: Listen to events on game session
  useEffect(() => {
    if (isMultiPlayer) {
      socket.on(`${gameId}`, callBack);
    }
  }, [gameId, socket, isMultiPlayer, callBack]);

  return {
    isMultiPlayer,
    playerId: player?.id,
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
  createQuestions: () => QuestionType[],
  isCorrectAttempt: (userAttempts: number[], correctAnswer: number) => boolean
) {
  const [data, setData] = useState<QuestionType[]>([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [gameInProgress, setGameInProgress] = useState<boolean | undefined>();
  const [scoreModalOpen, setScoreModalOpen] = useState(false);

  const correctAnswer = data?.[currentQuestion]?.correctAnswer;

  const setQuestions = useCallback(
    function setQuestions() {
      setData(createQuestions());
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

  const manageSound = useCallback(function manageSound(
    sound: "gameBackgroundMusic" | "renderScoreBackgroundMusic",
    action: "play" | "pause"
  ) {
    if (action === "play") {
      Sound?.[sound].play();
    } else {
      Sound?.[sound].pause();
    }
  },
  []);

  // Pause the game when ended
  useEffect(() => {
    //const sound = setSound();
    // setAudio(sound);
    return () => {
      Sound?.gameBackgroundMusic.pause();
      Sound?.renderScoreBackgroundMusic.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopGame = useCallback(
    function stopGame() {
      setAttempts([]);
      // set game in progress false
      setGameInProgress((oldValue) => {
        if (oldValue === true) {
          manageSound("gameBackgroundMusic", "pause");
          manageSound("renderScoreBackgroundMusic", "play");
          setScoreModalOpen(true);
          return false;
        }
      });
    },
    [manageSound]
  );

  const { timer, startTimer } = useTimer(gameTimeOut, stopGame);

  const startGame = useCallback(
    function startGame() {
      resetGame();
      setGameInProgress(true);
      startTimer();
      manageSound("gameBackgroundMusic", "play");
    },
    [manageSound, resetGame, startTimer]
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
    if (attempts.length) {
      const isCorrect = isCorrectAttempt(attempts, correctAnswer);

      if (isCorrect) {
        setScore(score + 5);
        nextQuestion();
      } else if (attempts.length === 3) {
        nextQuestion();
      }
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
    // const isRightSwipe = distance < -minSwipeDistance;
    setSwipeDirection(isLeftSwipe ? "left" : "right");
  };

  return { onTouchEnd, onTouchMove, onTouchStart, swipeDirection };
}

export function useStartGame() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { timer, startTimer } = useTimer(3, () => {
    setIsModalOpen(false);
  });

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  return {
    startingTimer: timer,
    isModalOpen,
  };
}
