import { useState, useCallback, useEffect } from "react";
import { urls } from "./constants.lib";
import { apiRequest } from "./server.lib";
import { PlayerType } from "./types.lib";
import { debounce } from "./utils.lib";

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
        console.log("Player Data not found");
        setPlayerData();
      }
    } catch (error) {
      // Data not found or not valid
      console.log("Local storage not found on server");
    }
  }
  checkLocalData();

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
      storeData(response.data);
    }
  }
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
    //console.log("Updated Player everywhere");
    localStorage.setItem(
      localStorageConstant.user,
      JSON.stringify(response.data)
    );
  }
});

export function usePlayer() {
  const [player, setPlayer] = useState<PlayerType>(playerData);

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

  return { player, updatePlayerName };
}
