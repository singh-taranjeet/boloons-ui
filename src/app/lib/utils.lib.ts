import axios from "axios";
import { AppConfig } from "../../../config";
import { StyleConstants } from "./style.lib";

export function getClasses(params: {
  fontSize?: string;
  padding?: string;
  border?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  borderRadius?: string;
}) {
  let cx = "";

  const {
    fontSize,
    padding,
    border,
    color,
    bgColor,
    borderColor,
    borderRadius,
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
    cx += ` ${
      borderColor ? borderColor : StyleConstants.BorderColor["border-primary"]
    }`;
  }

  if (borderRadius) {
    cx += ` ${
      borderRadius ? borderRadius : StyleConstants.BorderRadius["rounded"]
    }`;
  }

  return cx;
}

export async function apiRequest<BodyType, ResponseType>(params: {
  method: "get" | "post" | "patch" | "delete";
  url: string;
  body?: BodyType;
}): Promise<{ success: boolean; message?: string; data?: ResponseType }> {
  const { method, url, body } = params;
  try {
    const response = await axios[method](
      `${AppConfig().apiUrl}/${url}`,
      body || {}
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}
