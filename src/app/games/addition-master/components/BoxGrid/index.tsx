import { useIsMobile } from "@/app/lib/client-helper";
import { Box } from "../Box";
import { Number } from "../Number";

interface BoxGridType {
  options: number[];
  onAttempt(attempt: number): void;
  attempts: number[];
}

export function BoxGrid(props: BoxGridType) {
  const { options, onAttempt, attempts = [] } = props;
  const isMobile = useIsMobile();
  return (
    <div
      className="grid gap-5 justify-center"
      style={{
        gridTemplateColumns: `repeat(3, ${isMobile ? "10rem" : "9rem"})`,
        gridTemplateRows: `repeat(3, ${isMobile ? "10rem" : "9rem"})`,
      }}
    >
      {options?.map((option) => (
        <Box
          selected={attempts.includes(option)}
          key={option}
          onAttempt={() => onAttempt(option)}
        >
          <Number number={option} color="blue" />
        </Box>
      ))}
    </div>
  );
}
