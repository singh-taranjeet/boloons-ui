import { Game } from "./components/Game";
import { QuestionType } from "../lib/game.types.lib";
import { GameType } from "./components/GameType";
import { Sentence } from "../../components/Sentence";
import { StyleConstants } from "@/app/lib/style.lib";
import { gameConstants } from "../lib/game.constants.lib";
import { Card } from "@/app/components/Card";
import Link from "next/link";
import { AppConstants, urls } from "@/app/lib/constants.lib";
import App from "next/app";

function HowToPlayDescription(props: Readonly<{ className?: string }>) {
  /* Bottom Heading */
  return (
    <>
      <Card className={`mt-normal md:mt-0 md:mx-normal ${props.className}`}>
        <Sentence className={`text-center`} fontSize="text-medium">
          {AppConstants.pages.sumAddict.description}
        </Sentence>
      </Card>
      {/* How do you want to play */}
      <Card className={`${props.className} mt-small md:mt-normal mx-normal`}>
        <GameType />
      </Card>
    </>
  );
}

// To render the sum addict game and its components
export default function Page() {
  return (
    <>
      <section className="md:flex md:flex-col md:self-center md:mx-normaol md:w-1/2">
        {/* Game Heading */}
        <Link href={urls.pages.games.sumAddict.gameUrl}>
          <Card className="m-normal mb-0 md:mb-normal md:w-fit md:mx-auto md:h-fit">
            <h1
              className={`${StyleConstants.FontSize["text-large"]} text-center text-primary`}
            >
              {gameConstants.games.sumAddict}
            </h1>
          </Card>
        </Link>

        {/* Desktop Heading */}
        <section className="flex-col justify-center m-small md:m-normal hidden md:flex md:mt-0">
          <HowToPlayDescription />
        </section>
      </section>
      <section className="flex flex-col md:self-center md:mx-normaol gap-normal md:gap-0 md:w-1/2">
        {/* Game section */}
        <Game
          currentQuestion={0}
          numbers={[initialQuestion].map((item) => item.correctAnswer)}
          learningMode={true}
          attempts={initialQuestion.answers}
          options={initialQuestion.options}
        />
        {/* Mobile Heading */}
        <HowToPlayDescription className="md:hidden mx-normal mb-normal" />
      </section>
    </>
  );
}

const initialQuestion: QuestionType = {
  options: [4, 3, 6, 8, 9, 2, 1, 7, 5],
  answers: [4, 9, 2],
  correctAnswer: 15,
};
