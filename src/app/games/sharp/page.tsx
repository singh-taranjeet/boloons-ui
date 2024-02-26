"use client";
import { AppConstants, urls } from "@/app/lib/constants.lib";
import { GamePage } from "../components/GamePage";

// To render the sum addict game and its components
export default function Page() {
  return (
    <GamePage
      gameUrl={urls.pages.games.sharp.playUrl}
      description={AppConstants.pages.sharp.description}
      title={AppConstants.pages.sharp.title}
      imgSrc={"/media/sharp-logo.png"}
    >
      dsf
    </GamePage>
  );
}
