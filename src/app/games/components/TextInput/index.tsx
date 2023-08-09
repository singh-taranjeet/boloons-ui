import { FontSizeType } from "@/app/lib/constants";

export function TextInput(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <input
      type="text"
      style={{ outline: "none" }}
      {...props}
      className={`p-rectangle-normal ${FontSizeType.normal} border-primary rounded bg-white text-primary ${props.className}`}
    />
  );
}
