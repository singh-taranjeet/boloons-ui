import { Heading } from "./components/Heading";
import { Game } from "./components/Game";
import { QuestionType } from "./lib/types";

function HowToPlayDescription(props: { className: string }) {
  {
    /* Bottom Heading */
  }
  return (
    <section className={`hidden ${props.className}`}>
      <Heading className="text-3xl pt-6 md:text-lg md:pt-2">
        Select upto 3 number which sum up equal to the indicated number
      </Heading>
      {/* {isMobile ? <StartTimer startGame={startGame} /> : null} */}
    </section>
  );
}

export default function Page() {
  return (
    <>
      <section className="flex flex-col justify-center gap-4 max-w-5xl mx-auto w-full md:flex-row md:justify-around select-none">
        {/* Heading */}
        <section className="flex flex-col justify-center">
          <Heading>Addition Master</Heading>
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
      </section>
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
