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
export function Sentence(props: SentenceType) {
  const { fontSize = "text-medium", color = "text-primary" } = props;

  let cx = "";
  if (fontSize) {
    cx += `${fontSize ? fontSize : StyleConstants.FontSize["text-medium"]} `;
  }

  if (color) {
    cx += `${color ? color : StyleConstants.Color["text-primary"]} `;
  }
  return <p {...props} className={`${cx} ${props.className} leading-none`}></p>;
}