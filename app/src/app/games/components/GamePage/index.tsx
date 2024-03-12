"use client";
import { GameType } from "../GameType";
import { Sentence } from "../../../components/Sentence";
import { ImageContainer } from "../../../components/ImageContainer";
import { Card } from "@/app/components/Card";
import Image from "next/image";
import { gameConstants } from "../../lib/game.constants.lib";
import { useScreenSize } from "@/app/lib/cutom-hooks.lib";
import { breakPoints } from "@/app/lib/style.lib";
import { p } from "msw/lib/core/GraphQLHandler-jOzqbxSK";

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
  const screenSize = useScreenSize();
  return (
    <>
      <Card
        className={`mt-small sm:mt-normal md:mt-0 md:mx-normal hidden sm:block ${props.className}`}
      >
        <Sentence
          color="text-neon-green"
          className={`text-center sm:text-left`}
          fontSize="text-medium"
        >
          {props.description}
        </Sentence>
      </Card>
      <p className="text-primary px-normal text-center sm:hidden">
        {props.description}
      </p>
      {/* How do you want to play */}
      <Card className={`${props.className} sm:mt-normal mx-normal`}>
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
      <section className="hidden md:flex md:flex-col md:self-center md:mx-small lg:mx-normal md:flex-1 md:pb-0 pb-large">
        {/* Game Heading */}
        <Card className="m-normal mb-0 md:mb-normal md:w-fit md:mx-auto md:h-fit sm:gap-normal flex">
          <ImageContainer>
            <Image src={imgSrc} alt={title} width={50} height={50} />
          </ImageContainer>
          <h1
            className={`text-3xl lg:text-5xl  text-center text-neon-blue font-bold capitalize`}
          >
            {title}
          </h1>
        </Card>

        {/* Desktop Heading */}
        <section className="flex-col justify-center m-small md:mx-small lg:m-normal hidden md:flex md:mt-0">
          <HowToPlayDescription
            gamePlayUrl={gamePlayUrl}
            gameJoinUrl={gameJoinUrl}
            description={description}
            gameType={gameType}
            gameCreateUrl={gameCreateUrl}
          />
        </section>
      </section>
      <section className="flex flex-col md:self-center md:mx-small gap-normal md:gap-0 md:flex-1">
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
