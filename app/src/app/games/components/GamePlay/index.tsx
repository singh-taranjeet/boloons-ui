"use client";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import {
  useGame,
  useMultiplayer,
  useCountDownTimer,
} from "../../lib/game.hooks.lib";
import { GameProps, QuestionType } from "../../lib/game.types.lib";
import { useEffect, useState } from "react";
import { Modal } from "../../../components/Modal";
import { Card } from "../../../components/Card";
import { Sentence } from "../../../components/Sentence";
import { Href } from "../../../components/Href";
import { ScoreCard } from "../../components/ScoreCard";
import { urls } from "@/app/lib/constants.lib";
import { PulseLoading } from "@/app/components/PulseLoading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import Icon from "@/app/components/Icon";
import { faArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { flexCenter } from "@/app/lib/style.lib";

const GAME_TIMEOUT = 30; // 30 Seconds
const CountDownTime = 3;

interface GamePlayProps {
  Game(props: GameProps): React.ReactNode;
  createQuestions(): QuestionType[];
  isCorrectAttempt(
    userAttempts: number[],
    correctAnswer: number
  ): boolean | undefined;
  gameUrl: string;
}
export function GamePlay(props: GamePlayProps) {
  const { createQuestions, gameUrl, isCorrectAttempt, Game } = props;

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
    mainAudio,
  } = useGame(GAME_TIMEOUT, createQuestions, isCorrectAttempt);

  const router = useRouter();

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

  return (
    <>
      {/* Score and Timer component */}
      <section
        className={`md:flex md:flex-col md:gap-normal md:justify-center ${
          gameInProgress ? "" : "hidden"
        }`}
      >
        <ScoreAndTimer
          isMultiPlayer={isMultiPlayer}
          score={score}
          timer={timer}
          mainAudio={mainAudio}
          opponent={opponent}
        />
      </section>

      {/* Game section */}
      <div
        className={`mt-normal p-normal ${flexCenter} ${
          gameInProgress ? "" : "hidden"
        }`}
      >
        <Game
          currentQuestion={currentQuestion}
          numbers={data?.map((item) => item.correctAnswer)}
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

      {/* Starting Game Modal */}
      <Modal.ModalDialog open={isCountDownModalOpen}>
        <Modal.ModalBody>
          <div className="min-w-full">
            <Modal.ModalTitle>Starting game</Modal.ModalTitle>
          </div>
          <Modal.ModalContent>
            {isCountDownModalOpen}
            <Sentence
              fontSize="text-large"
              className="text-center animate-pulse"
            >
              {countDownTimer === 0
                ? "Starting now"
                : `Starting game in ${countDownTimer}`}
            </Sentence>
          </Modal.ModalContent>
        </Modal.ModalBody>
      </Modal.ModalDialog>

      {/* Score Modal */}
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
                <Href
                  href={gameUrl}
                  // href={urls.pages.games.sumAddict.gameUrl}
                  className="border-2 border-primary"
                >
                  <div className="flex w-full">
                    Play again{" "}
                    <Icon
                      icon={faRefresh}
                      color="text-white"
                      className="pl-small self-center"
                    />
                  </div>
                </Href>
                <Href
                  href={urls.pages.games.url}
                  className="border-2 border-white text-white"
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
