import { Game } from "./components/Game";
import { QuestionType } from "../lib/game.types.lib";
import { GameType } from "./components/GameType";
import { Sentence } from "../../components/Sentence";
import { StyleConstants } from "@/app/lib/style.lib";
import { gameConstants } from "../lib/game.constants.lib";
import { Card } from "@/app/components/Card";

function HowToPlayDescription(props: { className?: string }) {
  const { className = "" } = props;
  {
    /* Bottom Heading */
  }
  return (
    <>
      <Card className={`${props.className} mt-normal`}>
        <Sentence className={`text-center`} fontSize="text-medium">
          Select upto 3 number which sum up equal to the indicated number
        </Sentence>
      </Card>
      <Card className="mt-small md:mt-normal mx-normal">
        <GameType />
      </Card>
    </>
  );
}

export default function Page() {
  return (
    <>
      <Card className="m-small md:m-normal mb-0">
        <h1
          className={`${StyleConstants.FontSize["text-large"]} text-center text-primary`}
        >
          {gameConstants.games.sumAddict}
        </h1>
      </Card>
      {/* Heading */}
      <section className="flex-col justify-center m-small md:m-normal hidden md:flex">
        <HowToPlayDescription />
      </section>

      {/* Game section */}
      <Game
        currentQuestion={0}
        numbers={[initialQuestion()].map((item) => item.correctAnswer)}
        learningMode={true}
        attempts={initialQuestion().answers}
        options={initialQuestion().options}
      />
      <HowToPlayDescription className="max-sm:block mx-normal" />
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
