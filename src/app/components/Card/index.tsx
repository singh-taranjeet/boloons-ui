import { StyleConstants } from "@/app/lib/style.lib";

interface CardType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  variant?: "dark" | "light" | keyof typeof StyleConstants.BgColor;
}
export function Card(props: CardType) {
  const { variant = "light" } = props;
  const color =
    variant === "dark"
      ? "bg-light"
      : variant === "light"
      ? "bg-white"
      : variant;
  const cx = `p-small md:p-normal ${color} rounded ${props.className}`;
  return <div {...props} className={`${cx} shadow`}></div>;
}
