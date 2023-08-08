import { fontSizes, padding } from "@/app/lib/constants";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

export function Button(
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <button
      {...props}
      className={`${fontSizes.normal} ${padding.normal} border rounded text-cyan-500 border-cyan-500 ${props.className}`}
    ></button>
  );
}
