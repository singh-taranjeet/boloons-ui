import { StyleConstants } from "./style.lib";

export function getClasses(params: {
  fontSize?: string;
  padding?: string;
  border?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}) {
  let cx = "";

  const { fontSize, padding, border, color, bgColor, borderColor } = params;

  if (fontSize) {
    cx += `${fontSize ? fontSize : StyleConstants.FontSize["text-medium"]} `;
  }

  if (padding) {
    cx += `${padding ? padding : StyleConstants.Padding["p-rectangle-small"]} `;
  }
  if (border) {
    cx += `${border ? border : StyleConstants.Border["border-2"]} `;
  }
  if (color) {
    cx += `${color ? color : StyleConstants.Color["text-primary"]} `;
  }
  if (bgColor) {
    cx += `${bgColor ? bgColor : StyleConstants.BgColor["bg-white"]} `;
  }
  if (borderColor) {
    cx += `${
      borderColor ? borderColor : StyleConstants.BorderColor["border-primary"]
    }`;
  }

  return cx;
}
