"use client";
import { useHttp, usePlayer, useWebSocket } from "@/app/lib/cutom-hooks";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { TextInput } from "../../../components/TextInput";
import { Sentence } from "../../../components/Sentence";
import { useSearchParams } from "next/navigation";
import { flexCenter } from "@/app/lib/style.lib";
import { gameConstants } from "../../lib/constants";
import { useRouter } from "next/navigation";
import { urls } from "@/app/lib/constants";
import Modal from "@/app/games/components/Modal";
import { Href } from "@/app/games/components/Href";
import Image from "next/image";

export function JoinGame(props: { onClickJoin: () => void }) {
  const params = useSearchParams();
  const { socket } = useWebSocket();
  const { player, updatePlayerName } = usePlayer();
  const gameId = params?.get("id");
  const router = useRouter();
  const { onClickJoin } = props;

  const { response, error, loading } = useHttp(
    `${urls.api.getGame}/${gameId}`,
    "get"
  );

  const isValidGameId = response && !loading;

  function join() {
    // setJoined(true);
    socket.emit(gameConstants.multiPlayer.events.playerJoined, {
      gameId,
      name: player?.name,
      playerId: player?.id,
    });
    onClickJoin();
  }

  function onChangePlayerName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updatePlayerName(value);
  }

  const onGameStart = useCallback(
    function onGameStart(res: { type: string }) {
      if (
        res.type === gameConstants.multiPlayer.eventMessageType.gameStartedMsg
      ) {
        router.push(`${gameConstants.playUrl}?gameId=${gameId}`);
      }
    },
    [gameId, router]
  );

  useEffect(() => {
    socket.on(`${gameId}`, onGameStart);
    return () => {
      socket.off(`${gameId}`, onGameStart);
    };
  }, [gameId, onGameStart, socket]);

  return (
    <>
      {loading ? (
        <Card className="flex-center mt-normal">
          <Image
            className="mx-auto"
            src={"/images/loading-spinner.svg"}
            height={200}
            width={200}
            alt="Loading"
          />
        </Card>
      ) : null}
      {isValidGameId ? (
        <Card className={`${flexCenter} text-primary mt-large`}>
          <Sentence>You have been invited to join game</Sentence>

          <section className={`mt-normal`}>
            <div className={`${flexCenter}`}>
              <label htmlFor="player-name">Enter your name</label>
              <TextInput
                id="player-name"
                type="text"
                name="Player name"
                placeholder="Enter your name"
                className={`w-full my-normal`}
                value={player?.name}
                onChange={onChangePlayerName}
              />
            </div>
            <Button className="flex mx-auto" onClick={join}>
              Join
            </Button>
          </section>
        </Card>
      ) : (
        // If not valid show modal
        <Modal
          title="This is not a valid game"
          open={!isValidGameId && !loading}
        >
          <Card className="">
            <Image
              className="mx-auto"
              src={"/images/game-not-found.svg"}
              width={300}
              height={300}
              alt="Game not found"
              priority={false}
            ></Image>
          </Card>
          <Button className="flex mt-small mx-auto">
            <Href href={`${urls.pages.games.sumAddict.gameUrl}`}>close</Href>
          </Button>
        </Modal>
      )}
    </>
  );
}
