"use client";
import { TextInput } from "@/app/components/TextInput";
import { usePlayer } from "@/app/lib/player-hook.lib";
import { useState } from "react";

const SaveButton = () => {
  const { loading } = usePlayer();

  return (
    <button
      className={`bg-primary text-white w-20 h-fit self-end mb-2 rounded-full p-rectangle-normal ${
        loading ? "animate-spin" : ""
      }`}
      type="submit"
    >
      {loading ? "->" : "Save"}
    </button>
  );
};

interface PlayerProps {
  saveButton?: boolean;
}
export const Player = (props: PlayerProps) => {
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
    <div className="flex gap-normal">
      <label className="text-primary text-lg">
        Name
        <TextInput
          aria-label="Player name"
          className="mt-small md-mt-normal w-full"
          placeholder="Enter your name"
          value={name}
          autoComplete="name"
          onKeyDown={onKeyDown}
          onChange={(e) => setName(e.target.value)}
          onBlur={onBlur}
        />
      </label>
      {props.saveButton ? <SaveButton /> : null}
    </div>
  );
};
