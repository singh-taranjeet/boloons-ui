"use client";
import { Box } from "../Box";
import Image from "next/image";
import { Number } from "../Number";
import { StyledBoxGrid } from "./styles";
import { useIsMobile } from "@/app/lib/cutom-hooks.lib";

interface BoxGridType {
  options: number[];
  onAttempt(attempt: number): void;
  attempts: number[];
  learningMode: boolean;
}

export function BoxGrid(props: BoxGridType) {
  const { options, onAttempt, attempts = [], learningMode = false } = props;
  const isMobile = useIsMobile();
  return (
    <StyledBoxGrid
      className={`grid gap-normal justify-center bg-light w-fit p-normal rounded mx-auto`}
    >
      {options?.map((option) => (
        <div key={option} className="relative">
          <Box
            selected={attempts.includes(option)}
            onAttempt={() => onAttempt(option)}
          >
            <Number
              fontSize={isMobile ? "text-very-large" : "text-extra-very-large"}
              number={option}
              color="blue"
            />
          </Box>
          {attempts.includes(option) && learningMode ? (
            <Image
              className="absolute bottom-0 -right-6 z-10"
              src={"/images/finger-pointer.svg"}
              width={50}
              height={50}
              alt="select"
              style={{ width: "50px", height: "50px" }}
            />
          ) : null}
        </div>
      ))}
    </StyledBoxGrid>
  );
}
