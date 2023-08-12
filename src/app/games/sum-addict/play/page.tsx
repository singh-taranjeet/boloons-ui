"use client";
import { getRandomInt } from "@/app/lib/server-helper";
import { shuffle, drop } from "lodash";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import { Controls } from "./components/Controls";
import { useIsMobile } from "@/app/lib/cutom-hooks";
import { Game } from "../components/Game";
import {
  useGame,
  useMultiplayer,
  useStartGame,
  useTimer,
} from "../../lib/custom-hooks";
import { QuestionType } from "../lib/types";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";

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
  const { startingTimer, isModalOpen } = useStartGame();
  const [opponent, setOpponent] = useState({ score: 0, name: "" });

  const initGame = useTimer(3, startGame);

  const { isMultiPlayer, playerId } = useMultiplayer(score, onScore);

  function onScore(res: any) {
    console.log("res", res);
    const os = res?.players?.find(
      (player: { id: string }) => `${player.id}` !== `${playerId}`
    );
    setOpponent({ score: os.score, name: os.name || "" });
  }

  function isCorrectAttempt(userAttempts: number[], correctAnswer: number) {
    const sum = userAttempts.reduce((item, sum) => {
      return item + sum;
    }, 0);
    return sum === correctAnswer;
  }

  useEffect(() => {
    initGame.startTimer();
  }, [initGame]);

  return (
    <>
      {/* Score and Timer */}
      <section
        className={`md:flex md:flex-col md:gap-normal md:justify-center`}
      >
        <ScoreAndTimer
          isMultiPlayer={isMultiPlayer}
          score={score}
          timer={timer}
          opponent={opponent}
        />
        {/* {!isMobile ? (
          <Controls gameInProgress={gameInProgress} onClick={startGame} />
        ) : null} */}
      </section>

      {/* Game section */}
      <div className="mt-normal p-square-normal">
        <Game
          currentQuestion={currentQuestion}
          numbers={data.map((item) => item.correctAnswer)}
          attempts={attempts}
          onAttempt={onAttempt}
          options={data[currentQuestion]?.options}
        />
      </div>
      {/* Controls
      {isMobile ? (
        <Controls gameInProgress={gameInProgress} onClick={startGame} />
      ) : null} */}

      <Modal open={isModalOpen}>Starting game in {startingTimer}</Modal>
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
