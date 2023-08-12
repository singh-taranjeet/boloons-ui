import { FontSizeType } from "@/app/lib/constants";
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
      className={`${FontSizeType.normal} p-rectangle-normal border-2 rounded text-primary border-primary bg-white ${props.className}`}
    ></button>
  );
}
