"use client";
import { useHttp, usePlayer, useWebSocket } from "@/app/lib/cutom-hooks.lib";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { TextInput } from "../../../components/TextInput";
import { Sentence } from "../../../components/Sentence";
import { useSearchParams } from "next/navigation";
import { flexCenter } from "@/app/lib/style.lib";
import { useRouter } from "next/navigation";
import { urls } from "@/app/lib/constants.lib";
import Modal from "@/app/components/Modal";
import { Href } from "@/app/components/Href";
import Image from "next/image";
import { gameConstants } from "../../lib/game.constants.lib";

export function JoinGame() {
  const params = useSearchParams();
  const { socket } = useWebSocket();
  const { player, updatePlayerName } = usePlayer();
  const gameId = params?.get("id");
  const [joined, setJoined] = useState(false);
  const router = useRouter();

  const { response, error, loading } = useHttp(
    `${urls.api.getGame}/${gameId}`,
    "get"
  );

  const isValidGameId = response && !loading;

  function join() {
    setJoined(true);
    console.log("join clicked");
    socket.emit(gameConstants.multiPlayer.events.playerJoined, {
      gameId,
      name: player?.name,
      playerId: player?.id,
    });
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
        router.push(`${urls.pages.games.sumAddict.playUrl}?gameId=${gameId}`);
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
        <section className="flex-center">
          <Image
            className="mx-auto"
            src={"/images/loading-spinner.svg"}
            height={200}
            width={200}
            alt="Loading"
          />
        </section>
      ) : null}
      {isValidGameId ? (
        <section className={`${flexCenter} text-primary`}>
          <Sentence>You have been invited to join game</Sentence>

          <section>
            <div className={`${flexCenter}`}>
              <label htmlFor="player-name">Enter your name</label>
              <TextInput
                id="player-name"
                type="text"
                readOnly={joined}
                name="Player name"
                placeholder="Enter your name"
                className={`w-full my-normal`}
                value={player?.name}
                onChange={onChangePlayerName}
              />
            </div>
            <div className="mx-normal">
              {joined ? (
                <Sentence>Waiting for the game to start...</Sentence>
              ) : (
                <Button
                  className="flex mx-auto w-full"
                  tabIndex={1}
                  autoFocus={true}
                  onClick={join}
                >
                  Join
                </Button>
              )}
            </div>
          </section>
        </section>
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
