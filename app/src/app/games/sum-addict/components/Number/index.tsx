import { Sentence } from "@/app/components/Sentence";
import { FontSizeType } from "@/app/lib/types.lib";

export function Number(props: {
  number: number;
  fontSize?: FontSizeType;
  color?: "black" | "blue";
  label?: "question" | "option";
  className?: string;
}) {
  const { number, className = "", color = "black", label } = props;

  const fontColor = color === "black" ? "text-black" : `text-primary`;

  return (
    <div className="flex flex-col justify-center cursor-pointer h-full">
      <Sentence
        aria-label={`${label || ""}`}
        className={`select-none text-center ${fontColor} ${className}`}
      >
        {number}
      </Sentence>
    </div>
  );
}
