import { Game } from "./components/Game";
import { QuestionType } from "./lib/types";
import { GameType } from "./components/GameType";
import { gameConstants } from "./lib/constants";
import { Sentence } from "../components/Sentence";

function HowToPlayDescription(props: { className: string }) {
  {
    /* Bottom Heading */
  }
  return (
    <section className={`hidden ${props.className}`}>
      <Sentence className="text-3xl pt-6 md:text-lg md:pt-2">
        Select upto 3 number which sum up equal to the indicated number
      </Sentence>
      <GameType />
    </section>
  );
}

export default function Page() {
  return (
    <>
      {/* Heading */}
      <section className="flex flex-col justify-center">
        <Sentence>{gameConstants.name}</Sentence>
        <HowToPlayDescription className="md:block" />
      </section>

      {/* Game section */}
      <Game
        currentQuestion={0}
        numbers={[initialQuestion()].map((item) => item.sum)}
        learningMode={true}
        attempts={initialQuestion().answers}
        // onAttempt={emptyFunction}
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
    sum: 18,
  };
}
