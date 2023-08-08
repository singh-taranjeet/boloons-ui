import { colors, padding } from "@/app/lib/constants";

export function Card(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  return (
    <div
      {...props}
      className={`${padding.square.normal} ${colors.lightBackGroundColor} rounded ${props.className}`}
    ></div>
  );
}
