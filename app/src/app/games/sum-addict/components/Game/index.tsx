"use client";
import { emptyFunction } from "@/app/lib/server.lib";
import { BoxGrid } from "../BoxGrid";
import { NumberGrid } from "../NumberGrid";
import { GameProps } from "@/app/games/lib/game.types.lib";

export function Game(props: Readonly<GameProps>) {
  const {
    currentQuestion,
    learningMode = false,
    attempts,
    onAttempt = emptyFunction,
    options,
    numbers,
  } = props;

  return (
    <section className="mt-small md:mt-normal flex flex-col justify-center">
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
