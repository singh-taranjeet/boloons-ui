export const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const appConstants = {
  playerInfoLocalStorage: "playerInfoLocalStorage",
};
export type KeyOfFontSizeType = keyof typeof FontSizeType;
export const FontSizeType = {
  small: "text-base", // => 16px
  normal: "text-xl", // => 20px
  large: "text-3xl", // => 24px
  veryLarge: "text-5xl", // => 48px
  extraVeryLarge: "text-7xl", // => 72px
} as const;

export const urls = {
  images: "/images",
  icons: "/images/icons",
};
