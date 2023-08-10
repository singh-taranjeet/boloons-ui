"use client";
import { getRandomInt } from "@/app/lib/server-helper";
import { shuffle, drop } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import { Controls } from "./components/Controls";
import { useIsMobile } from "@/app/lib/cutom-hooks";
import { Game } from "../components/Game";
import { useMultiplayer, useTimer } from "../../lib/custom-hooks";

type DataType = ReturnType<typeof createQuestions>;
const GAME_TIMEOUT = 30; // 30 Seconds

export default function Page() {
  const [data, setData] = useState<DataType>([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [gameInProgress, setGameInProgress] = useState(false);

  const correctAnswer = data?.[currentQuestion]?.sum;

  const isMobile = useIsMobile();

  function onScore(res: any) {
    console.log("res", res);
  }

  useMultiplayer(score, onScore);

  function setQuestions() {
    setData(createQuestions());
  }

  const resetGame = useCallback(function resetGame() {
    setQuestions();
    setCurrentQuestion(0);
    setAttempts([]);
    setScore(0);
  }, []);

  const stopGame = useCallback(function stopGame() {
    setAttempts([]);
    // set game in progress false
    setGameInProgress(false);
  }, []);

  const { timer, startTimer } = useTimer(GAME_TIMEOUT, stopGame);

  const startGame = useCallback(
    function startGame() {
      // reset every thing
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
    [currentQuestion, data.length]
  );

  // on attemp change the question and update score
  useEffect(() => {
    if (attempts.length) {
      const sum = attempts.reduce((item, sum) => {
        return item + sum;
      }, 0);

      if (sum === correctAnswer) {
        setScore(score + 5);
        nextQuestion();
      } else if (attempts.length === 3) {
        nextQuestion();
      }
    }
    return () => {
      console.log("called in return unmount function");
    };
  }, [attempts, score, correctAnswer, nextQuestion]);

  // stop game when all the questions are completed
  useEffect(() => {
    if (currentQuestion >= data.length) {
      stopGame();
    }
  }, [currentQuestion, data.length, stopGame]);

  function onAttempt(attempt: number) {
    // console.log("attempt", attempt);
    if (gameInProgress) {
      setAttempts([...attempts, attempt]);
    }
  }

  return (
    <>
      {/* Score and Timer */}
      <section
        className={`md:flex md:flex-col md:gap-normal md:justify-center`}
      >
        <ScoreAndTimer score={score} timer={timer} />
        {!isMobile ? (
          <Controls gameInProgress={gameInProgress} onClick={startGame} />
        ) : null}
      </section>

      {/* Game section */}
      <div className="mt-normal">
        <Game
          currentQuestion={currentQuestion}
          numbers={data.map((item) => item.sum)}
          attempts={attempts}
          onAttempt={onAttempt}
          options={data[currentQuestion]?.options}
        />
      </div>
      {/* Controls */}
      {isMobile ? (
        <Controls gameInProgress={gameInProgress} onClick={startGame} />
      ) : null}
    </>
  );
}

interface QuestionType {
  options: number[];
  answers: number[];
  sum: number;
}

function generateQuestion(): QuestionType {
  const options = drop(Array.from(Array(10).keys()), 1);
  const answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];

  const sum = answers.reduce((item, currentSum) => item + currentSum, 0);

  return {
    options: shuffle(options),
    answers,
    sum,
  };
}

function createQuestions(): QuestionType[] {
  return Array.from(Array(15).keys()).map(() => {
    return generateQuestion();
  });
}
