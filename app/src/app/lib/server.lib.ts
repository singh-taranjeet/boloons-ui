import axios from "axios";
import { AppConfig } from "../../../config";

export function getRandomInt(max: number = 100000000): number {
  const int = Math.floor(Math.random() * max);
  if (int === 0) {
    return getRandomInt(max);
  }

  return int;
}

export function emptyFunction(): void {
  /* Empty function */
}

export async function apiRequest<BodyType, ResponseType>(params: {
  method: "get" | "post" | "patch" | "delete";
  url: string;
  body?: BodyType;
  useMyUrl?: boolean;
}): Promise<{ success: boolean; message?: string; data?: ResponseType }> {
  const { method, url, body, useMyUrl = false } = params;
  // console.log("Api Request", params);
  try {
    const response = await axios[method](
      useMyUrl ? url : `${AppConfig().apiUrl}/${url}`,
      body || {}
    );
    // console.log("Api Response", response);
    return response.data;
  } catch (error) {
    // console.log("Error in Api Request", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getGameMetaData(params: { url: string }) {
  const { url } = params;
  const game = await apiRequest<
    {},
    {
      _id: string;
      step: string;
      type: string;
      family: string;
      createdBy: string;
      __v: number;
    }
  >({
    url,
    method: "get",
  });

  if (game.success && game.data) {
    return {
      title: `You have been invited to play ${game.data.family} with ${game.data.createdBy}`,
      description: `Play ${game.data.family} with ${game.data.createdBy}`,
    };
  }
}
