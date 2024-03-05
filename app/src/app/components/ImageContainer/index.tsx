import { flexCenter } from "@/app/lib/style.lib";

export const ImageContainer = (props: { children: React.ReactNode }) => {
  return <div className={`${flexCenter} w-fit`}>{props.children}</div>;
};
