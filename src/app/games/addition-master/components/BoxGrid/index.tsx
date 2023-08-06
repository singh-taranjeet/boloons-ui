import { useIsMobile } from "@/app/lib/client-helper";
import { Box } from "../Box";
import { Number } from "../Number";
import Image from "next/image";

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
    <div
      className="grid gap-5 justify-center bg-slate-100 w-fit p-5 rounded mx-auto"
      style={{
        gridTemplateColumns: `repeat(3, ${isMobile ? "10rem" : "9rem"})`,
        gridTemplateRows: `repeat(3, ${isMobile ? "10rem" : "9rem"})`,
      }}
    >
      {options?.map((option, index) => (
        <div key={option} className="relative">
          <Box
            selected={attempts.includes(option)}
            onAttempt={() => onAttempt(option)}
          >
            <Number number={option} color="blue" />
          </Box>
          {attempts.includes(option) && learningMode ? (
            <Image
              className="absolute bottom-0 -right-8 z-10"
              src={"/images/finger-pointer.svg"}
              width={50}
              height={50}
              alt="select"
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
