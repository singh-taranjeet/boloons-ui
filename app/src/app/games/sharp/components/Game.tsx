"use client";
import { GameProps } from "../../lib/game.types.lib";
import Image from "next/image";
import { FingerPointer } from "@/app/components/FingerPointer";
import { urls } from "@/app/lib/constants.lib";
import "./game.css";

interface QuestionProps {
  question: number | string;
  children: React.ReactNode;
}
function QuestionWindow(props: QuestionProps) {
  const { question } = props;
  return (
    <div
      className="relative bg-neon-blue bg-opacity-10 w-fit rounded-lg"
      role="button"
      tabIndex={0}
    >
      <Image
        src={`${urls.media}sharp-question-background.webp`}
        width={100}
        height={100}
        alt={`${question}`}
      />
      {props.children}
    </div>
  );
}

function QuestionWindowText(props: { children: React.ReactNode }) {
  return (
    <p className="absolute top-1/2 left-1/2 text-xl sm:text-5xl transform-translate-center text-neon-green">
      {props.children}
    </p>
  );
}

function QuestionWindowOperation(props: { question: React.ReactNode }) {
  const { question } = props;
  let unicode = ``;
  switch (question) {
    case 1: {
      unicode = "\u002B";
      break;
    }
    case 2: {
      unicode = "\u002D";
      break;
    }
    case 3: {
      unicode = "\u002B";
      break;
    }
    case 4: {
      unicode = "\u00F7";
      break;
    }
    case 5: {
      unicode += "\u003D";
      break;
    }
  }
  return (
    <div className={`absolute top-1/2 left-1/2 transform-translate-center`}>
      <div
        className={`text-primary text-very-large ${
          question === 3 ? "rotate-45" : ""
        }`}
      >
        {unicode}
      </div>
    </div>
  );
}

function Thumb(props: {
  onAttempt: (attempt: number) => void;
  imgSrc: string;
  alt: string;
  children?: React.ReactNode;
  blurImage: string;
}) {
  const { onAttempt, imgSrc, alt, children, blurImage } = props;
  return (
    <button onClick={() => onAttempt(0)} className="animate-shake">
      <Image
        placeholder="blur"
        blurDataURL={`${urls.media}${blurImage}`}
        src={`${urls.media}${imgSrc}`}
        width={250}
        height={250}
        alt={alt}
      />
      {children}
    </button>
  );
}

export const Game = (props: GameProps) => {
  const { learningMode, onAttempt = () => {}, options = [] } = props;

  return (
    <section className={learningMode ? "pointer-events-none" : ""}>
      <div className="flex justify-between gap-normal">
        <QuestionWindow question={options[0]}>
          <QuestionWindowText>{options[0]}</QuestionWindowText>
        </QuestionWindow>

        <QuestionWindow question={options[1]}>
          <QuestionWindowOperation question={options[1]} />
        </QuestionWindow>

        <QuestionWindow question={options[2]}>
          <QuestionWindowText>{options[2]}</QuestionWindowText>
        </QuestionWindow>

        <QuestionWindow question={"equal"}>
          <QuestionWindowOperation question={5} />
        </QuestionWindow>

        <QuestionWindow question={options[3]}>
          <QuestionWindowText>
            {`${options[3]}`.length > 3
              ? Number(options[3]).toFixed(1)
              : options[3]}
          </QuestionWindowText>
        </QuestionWindow>
      </div>

      <div className="flex gap-normal justify-center mt-normal">
        <Thumb
          blurImage="sharp-up-blur.webp"
          alt={"correct answer"}
          imgSrc="sharp-up.webp"
          onAttempt={() => onAttempt(1)}
        >
          {learningMode ? (
            <FingerPointer className="bottom-small right-normal" />
          ) : null}
        </Thumb>

        <Thumb
          alt={"wrong answer"}
          imgSrc="sharp-down.webp"
          blurImage="sharp-down-blur.webp"
          onAttempt={() => onAttempt(0)}
        />
      </div>
    </section>
  );
};
