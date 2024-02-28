import { GameType } from "../GameType";
import { Sentence } from "../../../components/Sentence";
import { StyleConstants } from "@/app/lib/style.lib";
import { Card } from "@/app/components/Card";
import Image from "next/image";
import { gameConstants } from "../../lib/game.constants.lib";

function HowToPlayDescription(
  props: Readonly<{
    className?: string;
    description: string;
    gamePlayUrl: string;
    gameJoinUrl: string;
    gameCreateUrl: string;
    gameType: keyof typeof gameConstants.games;
  }>
) {
  /* Bottom Heading */
  const { gameJoinUrl, gamePlayUrl, gameType, gameCreateUrl } = props;
  return (
    <>
      <Card className={`mt-normal md:mt-0 md:mx-normal ${props.className}`}>
        <Sentence
          color="text-neon-green"
          className={`text-center`}
          fontSize="text-medium"
        >
          {props.description}
        </Sentence>
      </Card>
      {/* How do you want to play */}
      <Card className={`${props.className} mt-small md:mt-normal mx-normal`}>
        <GameType
          gameType={gameType}
          gamePlayUrl={gamePlayUrl}
          gameJoinUrl={gameJoinUrl}
          gameCreateurl={gameCreateUrl}
        />
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
  gamePlayUrl: string;
  gameJoinUrl: string;
  gameCreateUrl: string;
  gameType: keyof typeof gameConstants.games;
}
// Introduce the game to the user
export function GamePage(props: Readonly<GamePageProps>) {
  const {
    title,
    description,
    imgSrc,
    gameJoinUrl,
    gamePlayUrl,
    gameType,
    gameCreateUrl,
  } = props;
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
            className={`text-5xl text-center text-neon-blue font-bold capitalize`}
          >
            {title}
          </h1>
        </Card>

        {/* Desktop Heading */}
        <section className="flex-col justify-center m-small md:m-normal hidden md:flex md:mt-0">
          <HowToPlayDescription
            gamePlayUrl={gamePlayUrl}
            gameJoinUrl={gameJoinUrl}
            description={description}
            gameType={gameType}
            gameCreateUrl={gameCreateUrl}
          />
        </section>
      </section>
      <section className="flex flex-col md:self-center md:mx-normaol gap-normal md:gap-0 md:w-1/2">
        {/* Game section */}
        {props.children}
        {/* Mobile Heading */}
        <HowToPlayDescription
          gameType={gameType}
          gameCreateUrl={gameCreateUrl}
          gamePlayUrl={gamePlayUrl}
          gameJoinUrl={gameJoinUrl}
          description={description}
          className="md:hidden mx-normal mb-normal"
        />
      </section>
    </>
  );
}
