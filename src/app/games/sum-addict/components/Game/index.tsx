"use client";
import { emptyFunction } from "@/app/lib/server-helper";
import { margin } from "@/app/lib/constants";
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
    <section>
      {/* Questions */}
      <NumberGrid currentQuestion={currentQuestion} numbers={numbers} />
      {/* Answers */}
      <section className={`${margin.marginUpSmall}`}>
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
