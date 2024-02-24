import { Game } from "./components/Game";
import { QuestionType } from "../lib/game.types.lib";
import { AppConstants } from "@/app/lib/constants.lib";
import { GamePage } from "../components/GamePage";

// To render the sum addict game and its components
export default function Page() {
  return (
    <GamePage
      description={AppConstants.pages.sumAddict.description}
      title={AppConstants.pages.sumAddict.title}
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
