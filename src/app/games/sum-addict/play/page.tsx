"use client";
import { getRandomInt } from "@/app/lib/server-helper";
import { shuffle, drop } from "lodash";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import { Controls } from "./components/Controls";
import { useIsMobile } from "@/app/lib/cutom-hooks";
import { Game } from "../components/Game";
import { useGame, useMultiplayer } from "../../lib/custom-hooks";
import { QuestionType } from "../lib/types";

const GAME_TIMEOUT = 30; // 30 Seconds

export default function Page() {
  const {
    attempts,
    score,
    currentQuestion,
    data,
    timer,
    gameInProgress,
    startGame,
    onAttempt,
  } = useGame(GAME_TIMEOUT, createQuestions, isCorrectAttempt);

  const isMobile = useIsMobile();

  function onScore(res: any) {
    console.log("res", res);
  }

  useMultiplayer(score, onScore);

  function isCorrectAttempt(userAttempts: number[], correctAnswer: number) {
    const sum = userAttempts.reduce((item, sum) => {
      return item + sum;
    }, 0);
    return sum === correctAnswer;
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
          numbers={data.map((item) => item.correctAnswer)}
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

function generateQuestion(): QuestionType {
  const options = drop(Array.from(Array(10).keys()), 1);
  const answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];

  const sum = answers.reduce((item, currentSum) => item + currentSum, 0);

  return {
    options: shuffle(options),
    answers,
    correctAnswer: sum,
  };
}

function createQuestions(): QuestionType[] {
  return Array.from(Array(15).keys()).map(() => {
    return generateQuestion();
  });
}
