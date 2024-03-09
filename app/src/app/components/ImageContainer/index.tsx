import { flexCenter } from "@/app/lib/style.lib";

export const ImageContainer = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { children, className = "" } = props;
  return <div className={`${flexCenter} w-fit ${className}`}>{children}</div>;
};
