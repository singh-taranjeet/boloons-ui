"use client";
import {
  getUrlSearchParams,
  usePlayer,
  useWebSocket,
} from "@/app/lib/client-helper";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { TextInput } from "../../components/TextInput";
import { Text } from "../../components/Text";

export default function Page() {
  const { socket } = useWebSocket();
  const { player, updatePlayerName } = usePlayer();

  // Join socket connection and listen to the session id events
  useEffect(() => {
    socket.connect();
  }, [socket]);

  const gameId = getUrlSearchParams("id");

  function join() {
    console.log("joining");
    socket.emit("joinPlayers", {
      id: gameId,
      name: player.name,
      playerId,
    });
  }

  function onChangePlayerName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    updatePlayerName(value);
  }

  return (
    <>
      <Text className={`mt-10`}>You have been invited to join game</Text>

      <Card>
        <div className="flex justify-between">
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
      </Card>
    </>
  );
}
