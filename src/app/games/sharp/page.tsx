"use client";
import { AppConstants, urls } from "@/app/lib/constants.lib";
import { GamePage } from "../components/GamePage";
import { Game } from "./components/Game";
import { QuestionType } from "../lib/game.types.lib";

// To render the sharp game and its components
export default function Page() {
  return (
    <GamePage
      gameSoloUrl={urls.pages.games.sharp.playUrl}
      gameMultiplayerUrl={urls.pages.games.sharp.joinUrl}
      description={AppConstants.pages.sharp.description}
      title={AppConstants.pages.sharp.title}
      imgSrc={"/media/sharp-logo.png"}
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
