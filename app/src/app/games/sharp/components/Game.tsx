"use client";
import { GameProps } from "../../lib/game.types.lib";
import Image from "next/image";
import { FingerPointer } from "@/app/components/FingerPointer";
import { urls } from "@/app/lib/constants.lib";

interface QuestionProps {
  question: number | string;
  children: React.ReactNode;
}
function QuestionWindow(props: QuestionProps) {
  const { question } = props;
  return (
    <div
      className="relative border-neon-blue border bg-neon-blue bg-opacity-40 w-fit rounded-lg shadow-inner shadow-neon-blue"
      role="button"
      tabIndex={0}
    >
      <Image
        src={`${urls.media}sharp-question-background.svg`}
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
  let src = `${urls.media}operations/`;
  switch (question) {
    case 1: {
      src += "shap-plus.svg";
      break;
    }
    case 2: {
      src += "shap-minus.svg";
      break;
    }
    case 3: {
      src += "shap-mul.svg";
      break;
    }
    case 4: {
      src += "shap-div.svg";
      break;
    }
    case 5: {
      src += "shap-equal.svg";
      break;
    }
  }
  return (
    <Image
      src={src}
      width={50}
      height={50}
      alt={""}
      className="absolute top-1/2 left-1/2 transform-translate-center"
    />
  );
}

function Thumb(props: {
  onAttempt: (attempt: number) => void;
  imgSrc: string;
  alt: string;
  children?: React.ReactNode;
}) {
  const { onAttempt, imgSrc, alt, children } = props;
  return (
    <button onClick={() => onAttempt(0)} className="animate-shake">
      <Image
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
          alt={"correct answer"}
          imgSrc="sharp-up.svg"
          onAttempt={() => onAttempt(1)}
        >
          {learningMode ? (
            <FingerPointer className="bottom-small right-normal" />
          ) : null}
        </Thumb>

        <Thumb
          alt={"wrong answer"}
          imgSrc="sharp-down.svg"
          onAttempt={() => onAttempt(0)}
        />
      </div>
    </section>
  );
};
