import { colors, fontSizes, padding } from "@/app/lib/constants";
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
      className={
        `${fontSizes.normal} ${padding.rectangle.normal} border rounded` +
        ` text-${colors.primaryColor}` +
        ` border-${colors.primaryColor} ${props.className}`
      }
    ></button>
  );
}
