"use client";
import { getRandomInt } from "@/app/lib/server-helper";
import { shuffle, drop } from "lodash";
import { useEffect } from "react";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import { Controls } from "./components/Controls";
import { useIsMobile } from "@/app/lib/cutom-hooks";
import { Game } from "../components/Game";
import { useGame, useMultiplayer, useTimer } from "../../lib/custom-hooks";

const GAME_TIMEOUT = 30; // 30 Seconds

export default function Page() {
  const {
    attempts,
    score,
    nextQuestion,
    stopGame,
    currentQuestion,
    data,
    timer,
    gameInProgress,
    startGame,
    onAttempt,
    setScore,
  } = useGame<QuestionType>(GAME_TIMEOUT, createQuestions);

  const correctAnswer = data?.[currentQuestion]?.sum;

  const isMobile = useIsMobile();

  function onScore(res: any) {
    console.log("res", res);
  }

  useMultiplayer(score, onScore);

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
  }, [attempts, score, correctAnswer, nextQuestion, setScore]);

  // stop game when all the questions are completed
  useEffect(() => {
    if (currentQuestion >= data.length) {
      stopGame();
    }
  }, [currentQuestion, data.length, stopGame]);

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
