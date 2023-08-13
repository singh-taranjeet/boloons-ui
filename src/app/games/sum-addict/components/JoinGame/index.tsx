"use client";
import { usePlayer, useWebSocket } from "@/app/lib/cutom-hooks";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { TextInput } from "../../../components/TextInput";
import { Sentence } from "../../../components/Sentence";
import { useSearchParams } from "next/navigation";
import { flexCenter } from "@/app/lib/style.lib";
import { gameConstants } from "../../lib/constants";
import { useRouter } from "next/navigation";

export function JoinGame() {
  const params = useSearchParams();
  const { socket } = useWebSocket();
  const { player, updatePlayerName } = usePlayer();
  const [joined, setJoined] = useState(false);
  const gameId = params?.get("id");
  const router = useRouter();

  function join() {
    setJoined(true);
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
  }, [gameId, joined, onGameStart, socket]);

  return (
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
        <div className="flex justify-center">
          {joined ? (
            <Sentence>Waiting for game to start</Sentence>
          ) : (
            <Button onClick={join}>Join</Button>
          )}
        </div>
      </section>
    </Card>
  );
}
