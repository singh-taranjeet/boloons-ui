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

export const margin = {
  marginUp: "mt-10",
  marginUpSmall: "mt-5",
};

export const padding = {
  rectangle: {
    normal: "px-4 py-4",
  },
  square: {
    normal: "p-5",
    large: "p-10",
  },
};

export const gap = {
  small: "gap-3",
  normal: "gap-5",
  large: "gap-10",
};

export const classes = {
  center: "flex flex-col justify-center",
};

export const urls = {
  images: "/images",
  icons: "/images/icons",
};
