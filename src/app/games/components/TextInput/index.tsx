import { padding, FontSizeType } from "@/app/lib/constants";

export function TextInput(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <input
      type="text"
      {...props}
      className={`${props.className} ${padding.rectangle.normal} ${FontSizeType.normal} border-2 border-primary rounded bg-white text-primary`}
    />
  );
}
