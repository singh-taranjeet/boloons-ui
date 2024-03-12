import { AppConstants, urls } from "@/app/lib/constants.lib";
import { Game } from "./components/Game";
import { QuestionType } from "../lib/game.types.lib";
import { gameConstants } from "../lib/game.constants.lib";
import { GamePage } from "../components/GamePage";
import { Metadata } from "next";
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
    title: AppConstants.pages.sharp.title,
    description: AppConstants.pages.sharp.description,
  };
}

// To render the sharp game and its components
export default function Page() {
  return (
    <GamePage
      gameType={gameConstants.games.Sharp}
      gamePlayUrl={urls.pages.games.sharp.playUrl}
      gameJoinUrl={urls.pages.games.sharp.joinUrl}
      gameCreateUrl={urls.pages.games.sharp.createUrl}
      description={AppConstants.pages.sharp.description}
      title={AppConstants.pages.sharp.title}
      imgSrc={`${urls.media}sharp-logo.webp`}
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
  options: [4, 1, 6, 10],
  answers: [1, 0],
  correctAnswer: 1,
};
