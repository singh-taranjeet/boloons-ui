import { GameType } from "../GameType";
import { Sentence } from "../../../components/Sentence";
import { StyleConstants } from "@/app/lib/style.lib";
import { gameConstants } from "../../lib/game.constants.lib";
import { Card } from "@/app/components/Card";
import Image from "next/image";
import { AppConstants, urls } from "@/app/lib/constants.lib";

function HowToPlayDescription(
  props: Readonly<{ className?: string; description: string }>
) {
  /* Bottom Heading */
  return (
    <>
      <Card className={`mt-normal md:mt-0 md:mx-normal ${props.className}`}>
        <Sentence className={`text-center`} fontSize="text-medium">
          {props.description}
        </Sentence>
      </Card>
      {/* How do you want to play */}
      <Card className={`${props.className} mt-small md:mt-normal mx-normal`}>
        <GameType />
      </Card>
    </>
  );
}

// To render the game and its components
interface GamePageProps {
  children: React.ReactNode;
  title: string;
  description: string;
  imgSrc: string;
}
// Introduce the game to the user
export function GamePage(props: Readonly<GamePageProps>) {
  const { title, description, imgSrc } = props;
  return (
    <>
      <section className="md:flex md:flex-col md:self-center md:mx-normaol md:w-1/2 md:pb-0 mb-large">
        {/* Game Heading */}
        <Card className="m-normal mb-0 md:mb-normal hidden md:flex md:w-fit md:mx-auto md:h-fit gap-normal">
          <Image
            src={imgSrc}
            alt={title}
            width={50}
            height={50}
            className="animate-bounce"
          />
          <h1
            className={`${StyleConstants.FontSize["text-large"]} text-center text-primary`}
          >
            {title}
          </h1>
        </Card>

        {/* Desktop Heading */}
        <section className="flex-col justify-center m-small md:m-normal hidden md:flex md:mt-0">
          <HowToPlayDescription description={description} />
        </section>
      </section>
      <section className="flex flex-col md:self-center md:mx-normaol gap-normal md:gap-0 md:w-1/2">
        {/* Game section */}
        {props.children}
        {/* Mobile Heading */}
        <HowToPlayDescription
          description={description}
          className="md:hidden mx-normal mb-normal"
        />
      </section>
    </>
  );
}
