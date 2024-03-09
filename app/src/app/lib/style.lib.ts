export const flexCenter = "flex flex-col justify-center";
export const pinkish = "bg-pink-700";
export const breakPoints = {
  xs: 380,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};
const FontSize = {
  "text-small": "text-small", // :> 16px
  "text-medium": "text-medium", // :> 20px
  "text-large": "text-large", // :> 24px
  "text-very-large": "text-very-large", // :> 48px
  "text-extra-very-large": "text-extra-very-large", // => 72px
} as const;

const Padding = {
  "p-small": "p-small", // :> 12px
  "p-normal": "p-normal", // :> 20px
  "p-large": "p-large", // :> 40px
  "p-rectangle-normal": "p-rectangle-normal",
  "p-rectangle-small": "p-rectangle-small md:p-rectangle-normal",
  "p-0": "p-0",
} as const;

const Margin = {
  "m-small": "m-small", // :> 12px
  "m-normal": "m-normal", // :> 20px
  "m-large": "m-large", // :> 40px
} as const;

const Border = {
  border: "border",
  "border-1": "border-1",
  "border-2": "border-2",
  "border-0": "border-0",
} as const;

const Radius = {
  rounded: "rounded",
  "rounded-full": "rounded-full",
  "rounded-none": "rounded-none",
} as const;

const Color = {
  "text-primary": "text-primary",
  "text-secondary": "text-secondary",
  "text-light": "text-light",
  "text-green": "text-green",
  "text-red": "text-red",
  "text-blue": "text-blue",
  "text-white": "text-white",
  "text-black": "text-black",
  "text-dark-blue": "text-dark-blue",
  "text-neon-blue": "text-neon-blue",
  "text-neon-green": "text-neon-green",
};

const BorderColor = {
  "border-primary": "border-primary",
  "border-secondary": "border-secondary",
  "border-light": "border-light",
  "border-green": "border-green",
  "border-red": "border-red",
  "border-blue": "border-blue",
  "border-white": "border-white",
};

const BgColor = {
  "bg-primary": "bg-primary",
  "bg-secondary": "bg-secondary",
  "bg-light": "bg-light",
  "bg-green": "bg-green",
  "bg-red": "bg-red",
  "bg-blue": "bg-blue",
  "bg-white": "bg-white",
};

export const StyleConstants = {
  FontSize,
  Padding,
  Margin,
  Border,
  Color,
  BgColor,
  BorderColor,
  BorderRadius: Radius,
};
