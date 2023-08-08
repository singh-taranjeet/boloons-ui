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
      className={`${padding.square.normal} ${colors.backGroundColorLight} rounded ${props.className}`}
    ></div>
  );
}
