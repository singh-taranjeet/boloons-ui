import { useIsMobile } from "@/app/lib/client-helper";

export function Number(props: {
  number: number;
  size?: "normal" | "small";
  color?: "black" | "blue";
}) {
  const { number, size = "normal", color = "black" } = props;
  const isMobile = useIsMobile();

  const fontSize =
    size === "normal"
      ? isMobile
        ? "text-9xl"
        : "text-8xl"
      : isMobile
      ? "text-6xl"
      : "text-4xl";
  const fontColor = color === "black" ? "text-black" : "text-cyan-500";

  return (
    <div className="flex flex-col justify-center p-2 cursor-pointer h-full">
      <p
        className={`select-none text-center leading-none ${fontSize} ${fontColor}`}
      >
        {number}
      </p>
    </div>
  );
}
