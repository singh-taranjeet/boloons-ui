import { padding, fontSizes } from "@/app/lib/constants";

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
      className={`${props.className} ${padding.rectangle.normal} ${fontSizes.normal}`}
    />
  );
}
