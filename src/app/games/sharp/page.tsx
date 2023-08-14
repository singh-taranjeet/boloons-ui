"use client";
import Image from "next/image";
import { EnumOperations, QuestionType } from "./lib/types";
import { ValuesProvider, useValues } from "./components/ValuesContext";
import {
  ColumnWrapper,
  StyledBoxWrapper,
  StyledGameControl,
  StyledOptions,
  StyledScore,
  StyledWrapper,
} from "./components/styles";
import { generateQuestion } from "./lib/helper";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useIsMobile } from "@/app/lib/cutom-hooks.lib";

function DashedRectangle(props: { color?: string; width: string }) {
  const { color, width } = props;

  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width={width}
        height={width}
        rx="6px"
        fill="white"
        stroke={color}
        strokeWidth="5px"
        strokeDasharray="5 5"
      />
    </svg>
  );
}

function Cloud(props: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const width = isMobile ? "" : "12rem";

  return (
    <StyledBoxWrapper>
      <DashedRectangle color="#1a7ff7" width={width} />
      <div className="children">{props.children}</div>
    </StyledBoxWrapper>
  );
}

function Question() {
  const { equation } = useValues();

  return (
    <div className="question">
      {equation.map(({ value, id }, index) => {
        return (
          <div key={id}>
            <Cloud>
              <div className="cloudText">
                <p>{index === 1 ? "?" : value}</p>
              </div>
            </Cloud>
            {index === 2 ? (
              <Cloud>
                <div className="cloudText">
                  <p>=</p>
                </div>
              </Cloud>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function OptionImage(props: { src: string; onClick(): void; alt: string }) {
  const { src, onClick, alt } = props;
  return <img src={src} alt={alt} onClick={onClick} />;
}

function Options() {
  const {
    equation,
    generateNextQuestion,
    game: { gameInProgress },
  } = useValues();

  function onClick(option: number) {
    if (gameInProgress) {
      if (option === equation[1].value) {
        generateNextQuestion(true);
      } else {
        generateNextQuestion(false);
      }
    }
  }

  return (
    <StyledOptions className="pointer d-flex justify-center">
      <section>
        <OptionImage
          src={"/images/Plus-cloud.svg"}
          alt="plus-icon"
          onClick={() => onClick(EnumOperations.ADD)}
        />
        <OptionImage
          src={"/images/Minus-cloud.svg"}
          alt="minus-cloud"
          onClick={() => onClick(EnumOperations.SUB)}
        />
        <OptionImage
          src={"/images/Multiply-cloud.svg"}
          alt="plus-icon"
          onClick={() => onClick(EnumOperations.MUL)}
        />
        <OptionImage
          src={"/images/Divide-cloud.svg"}
          alt="plus-icon"
          onClick={() => onClick(EnumOperations.DIV)}
        />
      </section>
    </StyledOptions>
  );
}

function GameControl() {
  const { startGame, stopGame } = useValues();

  return (
    <StyledGameControl className="f-center f-gap">
      <button onClick={startGame} title="Start Game">
        <Image
          width={25}
          height={25}
          alt="start game"
          src={"/images/Reload-icon.svg"}
        />
      </button>
      <button onClick={stopGame}>
        <Image
          width={25}
          height={25}
          alt="Stop game"
          src={"/images/stop-game.svg"}
        />
      </button>
    </StyledGameControl>
  );
}

function Score() {
  const {
    score: { current, history },
    game: { timer },
  } = useValues();
  return (
    <StyledScore className="f-gap d-flex justify-center">
      <h1>Score:{current}</h1>
      <h1>Timer: {timer}</h1>
      {history.length > 0 ? (
        <>
          <h3 className="f-center">High Score:</h3>
          <ul className="d-flex f-gap ">
            {history.length > 0 &&
              history.map((h, index) => {
                return (
                  <li className="f-center" key={index}>
                    {h}
                  </li>
                );
              })}
          </ul>
        </>
      ) : null}
    </StyledScore>
  );
}

export default function Page() {
  return (
    <StyledWrapper>
      <ValuesProvider>
        <ColumnWrapper>
          <Score />
          <Question />
          <div className="d-flex f-gap justify-center">
            <GameControl />
            <Options />
          </div>
        </ColumnWrapper>
      </ValuesProvider>
    </StyledWrapper>
  );
}
