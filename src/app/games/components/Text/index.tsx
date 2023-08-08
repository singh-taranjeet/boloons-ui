import { fontSizes } from "@/app/lib/constants";

export function Text(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) {
  return (
    <p {...props} className={`${fontSizes.normal} ${props.className}`}></p>
  );
}
