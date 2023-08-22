import { urls } from "@/app/lib/constants.lib";
import { apiRequest } from "@/app/lib/utils.lib";

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
  return response.success;
}

/*
To validate a game
*/
export async function validateGame(params: {
  gameId: string;
}): Promise<boolean> {
  const { gameId } = params;
  const response = await apiRequest({
    url: `${urls.api.getGame}/${gameId}`,
    method: "get",
  });

  if (response?.success) {
    return true;
  }
  return false;
}
