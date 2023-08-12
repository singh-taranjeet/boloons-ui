interface CardType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  variant?: "dark" | "light";
}
export function Card(props: CardType) {
  const { variant = "light" } = props;
  const color = variant === "dark" ? "bg-light" : "bg-slate-50";
  const cx = `p-square-normal ${color} rounded ${props.className}`;
  return <div {...props} className={cx}></div>;
}
