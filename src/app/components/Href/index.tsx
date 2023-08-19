import { StyleConstants } from "@/app/lib/style.lib";
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
    fontSize = StyleConstants.FontSize["text-medium"],
    padding = StyleConstants.Padding["p-rectangle-normal"],
    border = StyleConstants.Border["border-2"],
    color = StyleConstants.Color["text-white"],
    bgColor = StyleConstants.BgColor["bg-primary"],
    borderColor = StyleConstants.BorderColor["border-primary"],
    borderRadius = StyleConstants.BorderRadius["rounded-full"],
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
        className={`w-fit self-center rounded text-center ${cx} ${className}`}
      />
    </>
  );
}
