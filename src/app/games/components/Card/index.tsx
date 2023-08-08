import { padding } from "@/app/lib/constants";
interface CardType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  variant?: "dark" | "light";
}
export function Card(props: CardType) {
  const { variant = "black_white" } = props;
  const color = variant === "dark" ? "bg-secondary" : "bg-slate-50";
  const cx = `${padding.square.normal} ${color} rounded ${props.className}`;
  return <div {...props} className={cx}></div>;
}
