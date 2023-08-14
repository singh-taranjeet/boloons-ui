import { StyleConstants } from "./style.lib";

export type FontSizeType = keyof typeof StyleConstants.FontSize;

export type PaddingType = keyof typeof StyleConstants.Padding;

export type MarginType = keyof typeof StyleConstants.Margin;

export type BorderType = keyof typeof StyleConstants.Border;

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
}
