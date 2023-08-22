"use client";
import { usePlayer } from "@/app/lib/cutom-hooks.lib";
import { ChangeEvent } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { TextInput } from "../../../components/TextInput";
import { Sentence } from "../../../components/Sentence";
import { useSearchParams } from "next/navigation";
import { flexCenter } from "@/app/lib/style.lib";
import { urls } from "@/app/lib/constants.lib";
import { Modal } from "@/app/components/Modal";
import { Href } from "@/app/components/Href";
import Image from "next/image";
import { PulseLoading } from "@/app/components/PulseLoading";
import { useValidateGame } from "../../lib/game.hooks.lib";

export function JoinGame(props: { onClickJoin(): void }) {
  const { onClickJoin } = props;
  const params = useSearchParams();
  const { player, updatePlayerName } = usePlayer();
  const gameId = params?.get("id");

  const { isValidGame, validationInProgress } = useValidateGame(gameId || "");

  function onChangePlayerName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updatePlayerName(value);
  }

  return (
    <>
      {validationInProgress ? <PulseLoading></PulseLoading> : null}
      {isValidGame ? (
        <section className={`${flexCenter} text-primary`}>
          <Sentence>You have been invited to join game</Sentence>

          <section className="pt-small md:pt-normal">
            <div className={`${flexCenter}`}>
              <label htmlFor="player-name">Use gammer name</label>
              <TextInput
                id="player-name"
                type="text"
                name="Player name"
                placeholder="Enter your name"
                className={`w-full mt-small`}
                value={player?.name}
                onChange={onChangePlayerName}
              />
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
        <Modal.ModalDialog open={!isValidGame}>
          <Modal.ModalBody>
            <div className="min-w-full">
              <Modal.ModalTitle>This is not a valid game</Modal.ModalTitle>
              <Modal.ModalContent>
                <Card className="">
                  <Image
                    className="mx-auto"
                    src={"/media/not-found.png"}
                    width={300}
                    height={300}
                    alt="Game not found"
                    priority={false}
                  ></Image>
                </Card>
                <Button className="flex mt-small mx-auto">
                  <Href href={`${urls.pages.games.sumAddict.gameUrl}`}>
                    close
                  </Href>
                </Button>
              </Modal.ModalContent>
            </div>
          </Modal.ModalBody>
        </Modal.ModalDialog>
      )}
    </>
  );
}
