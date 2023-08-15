import { RootElementType } from "@/app/lib/types.lib";
import { getClasses } from "@/app/lib/utils.lib";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

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
    borderRadius = "rounded-full",
  } = props;

  const cx = getClasses({
    fontSize,
    padding,
    border,
    color,
    bgColor,
    borderColor,
    borderRadius,
  });
  return (
    <button
      {...props}
      className={`flex justify-center ${cx} ${props.className} whitespace-nowrap`}
    ></button>
  );
}
