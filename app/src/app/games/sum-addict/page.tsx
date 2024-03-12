import { Game } from "./components/Game";
import { QuestionType } from "../lib/game.types.lib";
import { AppConstants, urls } from "@/app/lib/constants.lib";
import { GamePage } from "../components/GamePage";
import { gameConstants } from "../lib/game.constants.lib";

import type { Metadata } from "next";
import { getGameMetaData } from "@/app/lib/server.lib";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const id = searchParams.id;
  const gameMetaData = await getGameMetaData({
    url: `${urls.api.getGame}/${id}`,
  });

  if (gameMetaData) {
    return gameMetaData;
  }

  return {
    title: AppConstants.pages.sumAddict.title,
    description: AppConstants.pages.sumAddict.description,
  };
}

export default function Page() {
  return (
    <GamePage
      gameType={gameConstants.games.SumAddict}
      gamePlayUrl={urls.pages.games.sumAddict.playUrl}
      gameJoinUrl={urls.pages.games.sumAddict.joinUrl}
      gameCreateUrl={urls.pages.games.sumAddict.createUrl}
      description={AppConstants.pages.sumAddict.description}
      title={AppConstants.pages.sumAddict.title}
      imgSrc={`${urls.media}sum-addiction-logo.webp`}
    >
      {/* Game section */}
      <Game
        currentQuestion={0}
        numbers={[initialQuestion].map((item) => item.correctAnswer)}
        learningMode={true}
        attempts={initialQuestion.answers}
        options={initialQuestion.options}
      />
    </GamePage>
  );
}

const initialQuestion: QuestionType = {
  options: [4, 3, 6, 8, 9, 2, 1, 7, 5],
  answers: [4, 9, 2],
  correctAnswer: 15,
};
