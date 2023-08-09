"use client";

import { usePlayer, useWebSocket } from "@/app/lib/cutom-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { gameConstants } from "../sum-addict/lib/constants";

export function useMultiplayer(callBack: (data: any) => void) {
  const [score, setScore] = useState(0);
  const params = useSearchParams();
  const gameId = params?.get("gameId");
  const isMultiPlayer = !!gameId;
  const { player } = usePlayer();
  const { socket } = useWebSocket();
  const frdProps = {
    score: {
      score,
      setScore,
    },
    // multiplayer: {
    //   isMultiPlayer,
    //   gameId,
    //   player,
    //   socket,
    // },
  };

  // MultiPlayer: Emit Event on score update
  useEffect(() => {
    if (gameId && isMultiPlayer) {
      socket.emit(gameConstants.multiPlayer.events.gameScored, {
        gameId,
        playerId: player?.id,
        score,
      });
    }
  }, [gameId, player?.id, score, socket, isMultiPlayer]);

  // Multiplayer: Listen to events on game session
  useEffect(() => {
    if (isMultiPlayer) {
      socket.on(`${gameId}`, callBack);
    }
  }, [gameId, socket, isMultiPlayer, callBack]);

  return frdProps;
}
