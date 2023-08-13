"use client";
import { getRandomInt } from "@/app/lib/server-helper";
import { shuffle, drop } from "lodash";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
// import { Controls } from "./components/Controls";
// import { useIsMobile } from "@/app/lib/cutom-hooks";
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
import { Card } from "../../components/Card";
import { Sentence } from "../../components/Sentence";
import { MultiplayerScore } from "./components/ScoreAndTimer/components/MultiPlayerScore";
import { Button } from "../../components/Button";
import { Href } from "../../components/Href";
import { gameConstants } from "../lib/constants";
import { flexCenter } from "@/app/lib/style.lib";
import { ScoreCard } from "../../components/ScoreCard";

const GAME_TIMEOUT = 30; // 30 Seconds

export default function Page() {
  const {
    attempts,
    score,
    currentQuestion,
    data,
    timer,
    startGame,
    onAttempt,
    scoreModalOpen,
  } = useGame(GAME_TIMEOUT, createQuestions, isCorrectAttempt);

  // const isMobile = useIsMobile();
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
      </section>

      {/* Game section */}
      <div className="mt-normal p-normal">
        <Game
          currentQuestion={currentQuestion}
          numbers={data.map((item) => item.correctAnswer)}
          attempts={attempts}
          onAttempt={onAttempt}
          options={data[currentQuestion]?.options}
        />
      </div>

      <Modal open={isModalOpen} title="Starting game">
        <Card>
          <Sentence className="text-center">
            {startingTimer === 0
              ? "Starting now"
              : `Starting game in ${startingTimer}`}
          </Sentence>
        </Card>
      </Modal>

      <Modal open={scoreModalOpen} title="Score card">
        <>
          <ScoreCard score={score} opponent={opponent} />
          <Href
            href={gameConstants.gameUrl}
            className={`p-rectangle-small mt-small mx-auto`}
          >
            Close
          </Href>
        </>
      </Modal>
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
