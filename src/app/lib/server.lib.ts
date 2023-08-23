import axios from "axios";
import { AppConfig } from "../../../config";

export function getRandomInt(max: number = 100000000): number {
  return Math.floor(Math.random() * max);
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
  try {
    const response = await axios[method](
      useMyUrl ? url : `${AppConfig().apiUrl}/${url}`,
      body || {}
    );
    return response.data;
  } catch (error) {
    console.log("Error in Api Request", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
