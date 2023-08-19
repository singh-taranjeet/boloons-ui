import { Sentence } from "@/app/components/Sentence";
import { FontSizeType } from "@/app/lib/types.lib";

export function Number(props: {
  number: number;
  fontSize?: FontSizeType;
  color?: "black" | "blue";
  label?: "question" | "option";
}) {
  const { number, fontSize = "text-large", color = "black", label } = props;

  const fontColor = color === "black" ? "text-black" : `text-primary`;

  return (
    <div className="flex flex-col justify-center cursor-pointer h-full">
      <Sentence
        aria-label={`${label || ""}`}
        fontSize={`${fontSize}`}
        className={`select-none text-center ${fontColor}`}
      >
        {number}
      </Sentence>
    </div>
  );
}
