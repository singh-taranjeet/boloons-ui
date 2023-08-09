"use client";
import { usePlayer, useWebSocket } from "@/app/lib/client-helper";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { TextInput } from "../../components/TextInput";
import { Sentence } from "../../components/Sentence";
import { useSearchParams } from "next/navigation";
import { flexCenter } from "@/app/lib/style.lib";
import { gameConstants } from "../lib/constants";
import { useRouter } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const { socket } = useWebSocket();
  const { player, updatePlayerName } = usePlayer();
  const [joined, setJoined] = useState(false);
  const gameId = params?.get("id");
  const router = useRouter();

  function join() {
    setJoined(true);
    socket.emit(gameConstants.multiPlayer.events.playerJoined, {
      id: gameId,
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
      <Sentence>You have been invited to join game {gameId}</Sentence>

      <section className={`mt-normal`}>
        <div className={`${flexCenter}`}>
          <TextInput
            type="text"
            name="Player name"
            placeholder="Enter your name"
            className={`w-full mb-5`}
            value={player?.name}
            onChange={onChangePlayerName}
          />
        </div>
        {joined ? (
          <Sentence>Waiting for game to start</Sentence>
        ) : (
          <Button className={`w-full`} onClick={join}>
            Join
          </Button>
        )}
      </section>
    </Card>
  );
}
