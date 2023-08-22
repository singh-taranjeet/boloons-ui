import { urls } from "@/app/lib/constants.lib";
import { apiRequest } from "@/app/lib/utils.lib";
import { GameStep } from "./game.types.lib";

export async function joinGame(params: {
  playerId: string;
  gameId: string;
  name: string;
}) {
  const { playerId, gameId, name } = params;
  const response = await apiRequest<
    {
      playerId: string;
      gameId: string;
      name: string;
    },
    string
  >({
    url: urls.api.joinGame,
    method: "post",
    body: {
      playerId,
      gameId,
      name,
    },
  });
  console.log("Join response", response);
  return response.success;
}

/*
To validate a game
*/
export async function validateGame(params: {
  gameId: string;
  step: GameStep;
}): Promise<boolean> {
  const { gameId, step } = params;
  const response = await apiRequest({
    url: `${urls.api.getGame}/${gameId}/${step}`,
    method: "get",
  });

  if (response?.success) {
    return true;
  }
  return false;
}
