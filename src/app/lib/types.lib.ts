import { StyleConstants } from "./style.lib";

export type FontSizeType = keyof typeof StyleConstants.FontSize;

export type PaddingType = keyof typeof StyleConstants.Padding;

export type MarginType = keyof typeof StyleConstants.Margin;

export type BorderType = keyof typeof StyleConstants.Border;

export type BorderRadius = keyof typeof StyleConstants.BorderRadius;

export type ColorType = keyof typeof StyleConstants.Color;

export type BgColorType = keyof typeof StyleConstants.BgColor;

export type BorderColorType = keyof typeof StyleConstants.BorderColor;

export interface RootElementType {
  fontSize?: FontSizeType;
  padding?: PaddingType;
  margin?: MarginType;
  border?: BorderType;
  color?: ColorType;
  bgColor?: BgColorType;
  borderColor?: BorderColorType;
  borderRadius?: BorderRadius;
}

// TODO Delete TODO DELTE
export interface RootResponseType<Type> {
  success: boolean;
  data: Type;
}
