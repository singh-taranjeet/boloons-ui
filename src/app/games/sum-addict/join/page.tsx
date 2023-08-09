"use client";
import { usePlayer, useWebSocket } from "@/app/lib/client-helper";
import { ChangeEvent, useEffect } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { TextInput } from "../../components/TextInput";
import { Sentence } from "../../components/Sentence";
import { useSearchParams } from "next/navigation";
import { flexCenter } from "@/app/lib/style.lib";

export default function Page() {
  const params = useSearchParams();
  const { socket } = useWebSocket();
  const { player, updatePlayerName } = usePlayer();

  // Join socket connection and listen to the session id events
  useEffect(() => {
    socket?.connect();
  }, [socket]);

  const gameId = params?.get("id");

  function join() {
    socket.emit("joinPlayers", {
      id: gameId,
      name: player?.name,
      playerId: player?.id,
    });
  }

  function onChangePlayerName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updatePlayerName(value);
  }

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
        <Button className={`w-full`} onClick={join}>
          Join
        </Button>
      </section>
    </Card>
  );
}
