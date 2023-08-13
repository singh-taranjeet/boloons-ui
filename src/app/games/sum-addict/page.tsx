import { Game } from "./components/Game";
import { QuestionType } from "./lib/types";
import { GameType } from "./components/GameType";
import { Sentence } from "../components/Sentence";
import { gameConstants } from "./lib/constants";
import { StyleConstants } from "../lib/constants";

function HowToPlayDescription(props: { className: string }) {
  {
    /* Bottom Heading */
  }
  return (
    <section className={`hidden ${props.className}`}>
      <Sentence className={`mt-normal text-center`} fontSize="text-large">
        Select upto 3 number which sum up equal to the indicated number
      </Sentence>
      <GameType />
    </section>
  );
}

export default function Page() {
  return (
    <>
      <h1
        className={`${StyleConstants.FontSize["text-large"]} text-center text-primary`}
      >
        {gameConstants.name}
      </h1>
      {/* Heading */}
      <section className="flex flex-col justify-center">
        <HowToPlayDescription className="md:block" />
      </section>

      {/* Game section */}
      <Game
        currentQuestion={0}
        numbers={[initialQuestion()].map((item) => item.correctAnswer)}
        learningMode={true}
        attempts={initialQuestion().answers}
        options={initialQuestion().options}
      />
      <HowToPlayDescription className="max-sm:block" />
    </>
  );
}

function initialQuestion(): QuestionType {
  return {
    options: [4, 3, 6, 8, 9, 2, 1, 7, 5],
    answers: [4, 9, 2],
    correctAnswer: 18,
  };
}
