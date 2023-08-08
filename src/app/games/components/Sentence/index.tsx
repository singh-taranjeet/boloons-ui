import { fontSizes } from "@/app/lib/constants";
interface SentenceType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "normal" | "large" | "small";
}
export function Sentence(props: SentenceType) {
  const { size = "normal" } = props;
  return <p {...props} className={`${fontSizes[size]} ${props.className}`}></p>;
}
