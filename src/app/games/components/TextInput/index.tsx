import { StyleConstants } from "../../lib/constants";
import { RootElementType } from "../../lib/types";

type TTextInput = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type TextInputType = TTextInput & RootElementType;
export function TextInput(props: TextInputType) {
  const cx = getClasses(props);

  return (
    <input
      type="text"
      style={{ outline: "none" }}
      {...props}
      className={`rounded ${cx} ${props.className}`}
    />
  );
}

function getClasses(params: {
  fontSize?: string;
  padding?: string;
  margin?: string;
  border?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}) {
  let cx = "";

  const {
    fontSize = "text-medium",
    padding = "p-rectangle-small",
    border = "border-2",
    color = "text-primary",
    bgColor = "bg-white",
    borderColor = "border-primary",
  } = params;

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
