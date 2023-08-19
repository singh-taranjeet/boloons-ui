import { StyleConstants } from "@/app/lib/style.lib";
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
    fontSize = StyleConstants.FontSize["text-medium"],
    padding = StyleConstants.Padding["p-rectangle-normal"],
    border = StyleConstants.Border["border-2"],
    color = StyleConstants.Color["text-white"],
    bgColor = StyleConstants.BgColor["bg-primary"],
    borderColor = StyleConstants.BorderColor["border-primary"],
    borderRadius = StyleConstants.BorderRadius["rounded-full"],
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
