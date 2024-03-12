"use client";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { Sentence } from "../../../components/Sentence";
import { useRouter, useSearchParams } from "next/navigation";
import { flexCenter } from "@/app/lib/style.lib";
import { Modal } from "@/app/components/Modal";
import Image from "next/image";
import { PulseLoading } from "@/app/components/PulseLoading";
import { useValidateGame } from "../../lib/game.hooks.lib";
import { gameConstants } from "../../lib/game.constants.lib";
import { urls } from "@/app/lib/constants.lib";
import { Player } from "@/app/components/Player";
import Link from "next/link";
import { usePlayer } from "@/app/lib/player-hook.lib";

export function JoinGame(props: { onClickJoin(): void; gameUrl: string }) {
  const { onClickJoin, gameUrl } = props;
  const params = useSearchParams();
  const router = useRouter();
  const gameId = params?.get("id");

  const { player } = usePlayer();

  const { isValidGame, validationInProgress } = useValidateGame(
    gameId || "",
    gameConstants.multiPlayer.step.Waitingplayers
  );

  function redirectToGame() {
    router.push(gameUrl);
  }

  return (
    <>
      {validationInProgress ? <PulseLoading></PulseLoading> : null}
      {isValidGame ? (
        <section className={`${flexCenter} text-primary`}>
          <Sentence>You have been invited to join game</Sentence>

          <section className="pt-small md:pt-normal">
            <div className={`${flexCenter}`}>
              <label htmlFor="player-name">
                Your gammer name: {player.name}
              </label>
              <p className="text-primary text-xs">
                You can change gammer name from settings
              </p>
            </div>
            <div className="mx-auto mb-0 mt-small md:mt-normal px-normal">
              <Button
                className="flex w-full"
                tabIndex={1}
                autoFocus={true}
                onClick={onClickJoin}
              >
                Join
              </Button>
            </div>
          </section>
        </section>
      ) : (
        // If not valid show modal
        <Modal.ModalDialog
          open={!isValidGame && !validationInProgress}
          onClose={() => redirectToGame()}
        >
          <Modal.ModalBody>
            <div className="min-w-full">
              <Modal.ModalTitle>This is not a valid game</Modal.ModalTitle>
              <Modal.ModalContent>
                <Card className="">
                  <Image
                    className="mx-auto"
                    src={`${urls.media}not-found.webp`}
                    width={300}
                    height={300}
                    alt="Game not found"
                    priority={false}
                  ></Image>
                </Card>
                <Button
                  className="flex mt-small mx-auto"
                  onClick={redirectToGame}
                >
                  Close
                </Button>
              </Modal.ModalContent>
            </div>
          </Modal.ModalBody>
        </Modal.ModalDialog>
      )}
    </>
  );
}
