"use client";
import { usePlayer, useWebSocket } from "@/app/lib/cutom-hooks";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gameConstants } from "../sum-addict/lib/constants";
import { QuestionType } from "../sum-addict/lib/types";

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
}

/**
 * Returns a timer value, and function start and stop timer.
 * @param time the maximum time you want to run timer for.
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
      setTimeout(stopTimer, (time + 1) * 1000);
      setTimer(time);
      intervalRef.current = setInterval(() => {
        setTimer((old) => {
          return old - 1;
        });
      }, 1000);
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
  const [gameInProgress, setGameInProgress] = useState(false);

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

  const stopGame = useCallback(function stopGame() {
    setAttempts([]);
    // set game in progress false
    setGameInProgress(false);
  }, []);

  const { timer, startTimer } = useTimer(gameTimeOut, stopGame);

  const startGame = useCallback(
    function startGame() {
      resetGame();
      setGameInProgress(true);
      startTimer();
    },
    [resetGame, startTimer]
  );

  const nextQuestion = useCallback(
    function nextQuestion() {
      setAttempts([]);
      if (currentQuestion < data.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameInProgress(false);
      }
    },
    [currentQuestion, data?.length]
  );

  const onAttempt = useCallback(
    function onAttempt(attempt: number) {
      // console.log("attempt", attempt);
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
  };
}
