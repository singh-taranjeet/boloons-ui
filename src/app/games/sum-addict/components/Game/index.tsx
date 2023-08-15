"use client";
import { emptyFunction } from "@/app/lib/server.lib";
import { BoxGrid } from "../BoxGrid";
import { NumberGrid } from "../NumberGrid";

interface GameType {
  currentQuestion: number;
  learningMode?: boolean;
  attempts: number[];
  onAttempt?(number: number): void;
  options: number[];
  numbers: number[];
}

export function Game(props: GameType) {
  const {
    currentQuestion,
    learningMode = false,
    attempts,
    onAttempt = emptyFunction,
    options,
    numbers,
  } = props;

  return (
    <section className="mt-small md:mt-normal">
      {/* Questions */}
      <NumberGrid currentQuestion={currentQuestion} numbers={numbers} />
      {/* Answers */}
      <section className={`mt-normal`}>
        <BoxGrid
          learningMode={learningMode}
          attempts={attempts}
          onAttempt={onAttempt}
          options={options}
        />
      </section>
    </section>
  );
}
