import { Sentence } from "@/app/games/components/Sentence";
import { FontSizeType } from "@/app/lib/types.lib";

export function Number(props: {
  number: number;
  fontSize?: FontSizeType;
  color?: "black" | "blue";
}) {
  const { number, fontSize = "text-large", color = "black" } = props;

  const fontColor = color === "black" ? "text-black" : `text-primary`;

  return (
    <div className="flex flex-col justify-center cursor-pointer h-full">
      <Sentence
        fontSize={`${fontSize}`}
        className={`select-none text-center ${fontColor}`}
      >
        {number}
      </Sentence>
    </div>
  );
}
