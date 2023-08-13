import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { RootElementType } from "../../lib/types";
import { getClasses } from "../../lib/utils";

type IButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonType = IButton & RootElementType;

export function Button(props: ButtonType) {
  const {
    fontSize = "text-medium",
    padding = "p-rectangle-small",
    border = "border-2",
    color = "text-white",
    bgColor = "bg-primary",
    borderColor = "border-primary",
  } = props;

  const cx = getClasses({
    fontSize,
    padding,
    border,
    color,
    bgColor,
    borderColor,
  });
  return (
    <button
      {...props}
      className={`rounded text-center ${cx} ${props.className}`}
    ></button>
  );
}
