export function Number(props: {
  number: number;
  size?: "normal" | "small";
  color?: "black" | "blue";
}) {
  const { number, size = "normal", color = "black" } = props;

  const fontSize = size === "normal" ? "text-9xl" : "text-6xl";
  const fontColor = color === "black" ? "text-black" : "text-cyan-500";

  return (
    <div className="flex flex-col justify-center p-2 cursor-pointer">
      <p className={`text-center leading-none ${fontSize} ${fontColor}`}>
        {props.number}
      </p>
    </div>
  );
}
