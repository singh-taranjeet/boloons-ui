import { RootElementType } from "@/app/lib/types.lib";
import { getClasses } from "@/app/lib/utils.lib";
import Link, { LinkProps } from "next/link";

type TLink = LinkProps;
interface StyledLinkType extends TLink {
  href: string;
  className?: string;
  children: React.ReactNode;
}

type LinkType = StyledLinkType & RootElementType;

export function Href(props: LinkType) {
  const { className = "" } = props;

  const {
    fontSize = "text-medium",
    padding = "p-rectangle-small",
    border = "border-2",
    color = "text-white",
    bgColor = "bg-primary",
    borderColor = "border-primary",
    borderRadius = "rounded-full",
  } = props;

  const cx = getClasses({
    fontSize,
    padding,
    border,
    color,
    bgColor,
    borderColor,
    borderRadius,
  });

  return (
    <>
      <Link
        {...props}
        className={`w-full self-center md:w-56 rounded text-center ${cx} ${className}`}
      />
    </>
  );
}
