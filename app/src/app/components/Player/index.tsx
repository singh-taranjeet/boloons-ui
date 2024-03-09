"use client";
import { TextInput } from "@/app/components/TextInput";
import { usePlayer } from "@/app/lib/player-hook.lib";
import { useState } from "react";

export const Player = () => {
  const { player, updatePlayerName } = usePlayer();

  const [name, setName] = useState(player?.name);

  function updateName(value: string) {
    if (player.name !== value) {
      updatePlayerName(value);
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    updateName(e.target.value);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      updateName(e.currentTarget.value);
    }
  }
  return (
    <TextInput
      aria-label="Player name"
      className="mt-small md-mt-normal w-full"
      placeholder="Enter your name"
      value={name}
      onKeyDown={onKeyDown}
      onChange={(e) => setName(e.target.value)}
      onBlur={onBlur}
    />
  );
};
