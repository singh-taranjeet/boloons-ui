"use client";
import { Box } from "../Box";
import Image from "next/image";
import { Number } from "../Number";
import { urls } from "@/app/lib/constants.lib";
import { FingerPointer } from "@/app/components/FingerPointer";

interface BoxGridType {
  options: number[];
  onAttempt(attempt: number): void;
  attempts: number[];
  learningMode: boolean;
}

export function BoxGrid(props: Readonly<BoxGridType>) {
  const { options, onAttempt, attempts = [], learningMode = false } = props;

  return (
    <section
      className={`grid gap-small sm:gap-normal justify-center bg-opacity-60 bg-pink-700 w-fit p-small sm:p-normal rounded mx-auto grid-cols-3`}
    >
      {options?.map((option) => (
        <div key={option} className="relative">
          <Box
            selected={attempts.includes(option)}
            onAttempt={() => onAttempt(option)}
          >
            <Number
              label="option"
              className={`text-very-large md:text-extra-very-large`}
              number={option}
              color="blue"
            />
          </Box>
          {attempts.includes(option) && learningMode ? (
            <FingerPointer className="bottom-0 -right-6" />
          ) : null}
        </div>
      ))}
    </section>
  );
}
