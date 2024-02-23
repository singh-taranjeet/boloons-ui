import { useState, useCallback, useEffect, useRef } from "react";
import { TestConstants, urls } from "./constants.lib";
import { apiRequest } from "./server.lib";
import { PlayerType } from "./types.lib";
import { debounce } from "./utils.lib";
import { AppConfig } from "../../../config";

const localStorageConstant = {
  playerName: "playerName",
  playerId: "playerId",
  user: "boloons-user",
} as const;

let playerData: PlayerType = { id: "", name: "" };
// Set player data
(() => {
  function checkLocalData() {
    try {
      const localData = localStorage.getItem(localStorageConstant.user);
      if (localData) {
        const data: PlayerType = JSON.parse(localData);
        playerData = data;
      } else {
        // Data not found or not valid
        setPlayerData();
      }
    } catch (error) {
      // Data not found or not valid
    }
  }

  function storeData(data: PlayerType) {
    playerData = data;
    localStorage.setItem(localStorageConstant.user, JSON.stringify(data));
  }

  async function setPlayerData() {
    const response = await apiRequest<undefined, PlayerType>({
      method: "get",
      url: urls.api.player,
    });
    if (response?.data) {
      if (AppConfig().env === "test") {
        storeData(TestConstants.player);
      }
      storeData(response.data);
    }
  }

  setTimeout(checkLocalData);
})();

const savePlayerNameApi = debounce<
  { player: PlayerType; update: (d: PlayerType) => void },
  undefined
>(async (data: { player: PlayerType; update: (d: PlayerType) => void }) => {
  const response = await apiRequest<PlayerType, PlayerType>({
    url: urls.api.player,
    method: "patch",
    body: data.player,
  });

  if (response?.data?.name) {
    data.update({
      ...data.player,
      name: response?.data?.name,
    });

    localStorage.setItem(
      localStorageConstant.user,
      JSON.stringify(response.data)
    );
  }
});

export function usePlayer() {
  const [player, setPlayer] = useState<PlayerType>(playerData);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const savePlayerNameApiUseCallBack = useCallback(savePlayerNameApi, []);

  const updatePlayerName = useCallback(
    (name: string) => {
      setPlayer((oldPlayer) => {
        savePlayerNameApiUseCallBack({ player: oldPlayer, update: setPlayer });
        return {
          ...oldPlayer,
          name,
        };
      });
    },
    [savePlayerNameApiUseCallBack]
  );

  // set timer if playerData is empty
  useEffect(() => {
    function clearTimer() {
      timerId.current && clearInterval(timerId.current);
    }
    if (!playerData.id) {
      timerId.current = setInterval(() => {
        if (playerData.id) {
          setPlayer(playerData);
          clearTimer();
        }
      }, 1000);
    } else {
      if (!player.id && playerData.id) {
        setPlayer(playerData);
      }
    }
    return () => clearTimer();
  }, [player.id]);

  return { player, updatePlayerName };
}
