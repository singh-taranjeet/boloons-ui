"use client";

import { usePlayer, useWebSocket } from "@/app/lib/cutom-hooks";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gameConstants } from "../sum-addict/lib/constants";

export function useMultiplayer(score: number, callBack: (data: any) => void) {
  const params = useSearchParams();
  const gameId = params?.get("gameId");
  const isMultiPlayer = !!gameId;
  const { player } = usePlayer();
  const { socket } = useWebSocket();

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
}

/**
 * Returns a timer value, and function start and stop timer.
 * @param time the maximum time you want to run timer for.
 * @param callBack  method to be called when timer is finished.
 */
export function useTimer(time: number, callBack: () => void) {
  const [timer, setTimer] = useState(time);
  const intervalRef = useRef<any>();

  function startTimer() {
    setTimeout(stopTimer, time * 1000);
    intervalRef.current = setInterval(() => {
      setTimer((old) => {
        return old - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    callBack();
  }

  return {
    timer,
    startTimer,
    stopTimer,
  };
}
