import { flexCenter } from "@/app/lib/style.lib";

export const ImageContainer = (props: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${flexCenter} w-fit ${props.className}`}>
      {props.children}
    </div>
  );
};
