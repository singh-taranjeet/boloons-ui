"use client";
import { getRandomInt } from "@/app/lib/server.lib";
import { shuffle, drop } from "lodash";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import { Game } from "../components/Game";
import {
  useGame,
  useMultiplayer,
  useCountDownTimer,
} from "../../lib/game.hooks.lib";
import { QuestionType } from "../../lib/game.types.lib";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "../../../components/Modal";
import { Card } from "../../../components/Card";
import { Sentence } from "../../../components/Sentence";
import { Href } from "../../../components/Href";
import { ScoreCard } from "../../components/ScoreCard";
import { flexCenter } from "@/app/lib/style.lib";
import { urls } from "@/app/lib/constants.lib";
import { PulseLoading } from "@/app/components/PulseLoading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import { faArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";

const GAME_TIMEOUT = 30; // 30 Seconds
const CountDownTime = 3;

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
  const router = useRouter();

  // const memoStartGame = useCallback(() => startGame(), [startGame]);

  const { countDownTimer, isCountDownModalOpen, startCountDownTimer } =
    useCountDownTimer({
      time: CountDownTime,
      callBack: startGame,
    });

  const [opponent, setOpponent] = useState({ score: 0, name: "" });

  const { isMultiPlayer, playerId, isValidGame, validationInProgress } =
    useMultiplayer({
      score,
      callBack: onScore,
    });

  function onScore(res: any) {
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

  const [validationModalOpen, setValidationModalOpen] = useState(isMultiPlayer);

  function onValidationModalClose() {
    router.push(urls.pages.games.sumAddict.gameUrl);
  }

  useEffect(() => {
    if (!isMultiPlayer) {
      startCountDownTimer();
    }
  }, [isMultiPlayer, startCountDownTimer]);

  useEffect(() => {
    if (isMultiPlayer && isValidGame) {
      setValidationModalOpen(false);
      startCountDownTimer();
    }
  }, [isMultiPlayer, isValidGame, startCountDownTimer]);

  console.log("isCountDownModalOpen", isCountDownModalOpen);

  return (
    <>
      {/* Score and Timer */}
      <section
        className={`md:flex md:flex-col md:gap-normal md:justify-center ${
          gameInProgress ? "" : "hidden"
        }`}
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

      {/* Validation Modal Open */}
      <Modal.ModalDialog
        open={validationModalOpen}
        onClose={onValidationModalClose}
      >
        <Modal.ModalBody>
          <div className="min-w-full">
            <Modal.ModalTitle>
              {validationInProgress
                ? "Checking game"
                : isValidGame
                ? "Ready to start"
                : "Game is not valid"}
            </Modal.ModalTitle>
          </div>
          <Modal.ModalContent>
            <Card>
              {validationInProgress ? (
                <PulseLoading />
              ) : (
                <div className="mx-auto flex flex-col justify-center gap-normal">
                  <Image
                    className="mx-auto"
                    src={`${urls.media}not-found.png`}
                    width={300}
                    height={300}
                    alt="Not found"
                  />
                  <Button onClick={onValidationModalClose}>Close</Button>
                </div>
              )}
            </Card>
          </Modal.ModalContent>
        </Modal.ModalBody>
      </Modal.ModalDialog>

      <Modal.ModalDialog open={isCountDownModalOpen}>
        <Modal.ModalBody>
          <div className="min-w-full">
            <Modal.ModalTitle>Starting game</Modal.ModalTitle>
          </div>
          <Modal.ModalContent>
            <Card>
              {isCountDownModalOpen}
              <Sentence className="text-center">
                {countDownTimer === 0
                  ? "Starting now"
                  : `Starting game in ${countDownTimer}`}
              </Sentence>
            </Card>
          </Modal.ModalContent>
        </Modal.ModalBody>
      </Modal.ModalDialog>

      <Modal.ModalDialog open={scoreModalOpen}>
        <Modal.ModalBody>
          <div className="min-w-full">
            <Modal.ModalStars />
          </div>
          <Modal.ModalContent>
            <>
              <ScoreCard
                isMultiPlayer={isMultiPlayer}
                score={score}
                opponent={opponent}
              />
              <div className={`flex justify-center gap-normal mt-small`}>
                <Href href={urls.pages.games.sumAddict.gameUrl}>
                  <div className="flex">
                    Play again{" "}
                    <Icon
                      icon={faRefresh}
                      color="text-white"
                      className="pl-small self-center"
                    />
                  </div>
                </Href>
                <Href
                  bgColor="bg-white"
                  color="text-primary"
                  href={urls.pages.games.url}
                >
                  <div className="flex">
                    <Icon icon={faArrowLeft} className="pr-small self-center" />
                    Go back
                  </div>
                </Href>
              </div>
            </>
          </Modal.ModalContent>
        </Modal.ModalBody>
      </Modal.ModalDialog>
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
