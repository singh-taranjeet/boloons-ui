import { FontSizeType, KeyOfFontSizeType } from "@/app/lib/constants";
interface SentenceType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: KeyOfFontSizeType;
}
export function Sentence(props: SentenceType) {
  const { size = "normal" } = props;
  return (
    <p
      {...props}
      className={`${FontSizeType[size]} text-primary ${props.className} leading-none`}
    ></p>
  );
}
