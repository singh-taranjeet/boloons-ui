import { StyleConstants } from "@/app/lib/style.lib";
import { ColorType, FontSizeType } from "@/app/lib/types.lib";

interface SentenceType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  fontSize?: FontSizeType;
  color?: ColorType;
}
export function Sentence(props: Readonly<SentenceType>) {
  const {
    fontSize = "text-medium",
    color = "text-primary",
    className = "",
  } = props;

  let cx = "";
  if (fontSize) {
    cx += `${fontSize || StyleConstants.FontSize["text-medium"]} `;
  }

  if (color) {
    cx += `${color || StyleConstants.Color["text-primary"]} `;
  }
  return <p {...props} className={`${cx} ${className} leading-none`}></p>;
}
