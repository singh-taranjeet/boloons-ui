import { RootElementType } from "@/app/lib/types.lib";

type TTextInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type TextInputType = TTextInput;
export function TextInput(props: TextInputType) {
  return (
    <input
      type="text"
      style={{ outline: "none" }}
      {...props}
      className={`shadow-inner rounded bg-transparent border-primary text-primary text-medium p-rectangle-normal border-2 ${props.className} placeholder-inherit`}
    />
  );
}
