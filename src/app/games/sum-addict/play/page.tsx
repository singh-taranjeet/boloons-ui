"use client";
import { getRandomInt } from "@/app/lib/server.lib";
import { shuffle, drop } from "lodash";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import { Game } from "../components/Game";
import {
  useGame,
  useMultiplayer,
  useStartGame,
  useTimer,
} from "../../lib/game.hooks.lib";
import { QuestionType } from "../../lib/game.types.lib";
import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { Card } from "../../../components/Card";
import { Sentence } from "../../../components/Sentence";
import { Href } from "../../../components/Href";
import { ScoreCard } from "../../components/ScoreCard";
import { flexCenter } from "@/app/lib/style.lib";
import { urls } from "@/app/lib/constants.lib";

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
    gameInProgress,
  } = useGame(GAME_TIMEOUT, createQuestions, isCorrectAttempt);

  const { startingTimer, isModalOpen } = useStartGame();

  const [opponent, setOpponent] = useState({ score: 0, name: "" });

  const initGame = useTimer(3, startGame);

  const { isMultiPlayer, playerId } = useMultiplayer(score, onScore);

  function onScore(res: any) {
    // DebugLog("res", res);
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
      <div className={`mt-normal p-normal ${gameInProgress ? "" : "hidden"}`}>
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
          <div className={`${flexCenter} mt-small`}>
            <Href
              href={urls.pages.games.sumAddict.gameUrl}
              className={`p-rectangle-small `}
            >
              Play again
            </Href>
          </div>
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
