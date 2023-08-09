import { Sentence } from "@/app/games/components/Sentence";
import { KeyOfFontSizeType } from "@/app/lib/constants";

export function Number(props: {
  number: number;
  size?: KeyOfFontSizeType;
  color?: "black" | "blue";
}) {
  const { number, size = "veryLarge", color = "black" } = props;

  const fontColor = color === "black" ? "text-black" : `text-primary`;

  return (
    <div className="flex flex-col justify-center cursor-pointer h-full">
      <Sentence
        size={`${size}`}
        className={`select-none text-center ${fontColor}`}
      >
        {number}
      </Sentence>
    </div>
  );
}
