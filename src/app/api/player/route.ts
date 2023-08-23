import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiRequest } from "@/app/lib/server.lib";
import { PlayerType } from "../../lib/types.lib";
import { CookieConstants, urls } from "../../lib/constants.lib";

export async function GET() {
  const cookieStore = cookies();
  let player = cookieStore.get(CookieConstants.player);

  async function newPlayer() {
    const response = await apiRequest<undefined, PlayerType>({
      method: "get",
      url: urls.api.player,
    });

    if (response.success && response.data) {
      const stringData = JSON.stringify(response.data);
      cookieStore.set(CookieConstants.player, stringData);
      return response.data;
    }
    return undefined;
  }

  if (player?.value) {
    try {
      const parsedData = JSON.parse(player?.value);
      console.log("Parsed", parsedData);
      return NextResponse.json(parsedData);
    } catch (error) {
      console.log("Cookie is malformed");
    }
  }

  const data = await newPlayer();
  return NextResponse.json(data);
}
