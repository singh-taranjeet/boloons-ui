import { StyleConstants } from "@/app/lib/style.lib";
import { RootElementType } from "@/app/lib/types.lib";
import { getClasses } from "@/app/lib/utils.lib";
import Link, { LinkProps } from "next/link";

type TLink = LinkProps;
interface StyledLinkType extends TLink {
  href: string;
  className?: string;
  children: React.ReactNode;
  active?: boolean;
}

type LinkType = StyledLinkType & RootElementType;

export function Href(props: LinkType) {
  const { className = "", active = false } = props;

  const activeClass = active
    ? "bg-primary text-white"
    : "bg-opacity-60 bg-pink-700 text-primary";

  return (
    <>
      <Link
        href={props.href}
        className={`w-fit self-center rounded text-center ${className} ${activeClass} p-rectangle-normal rounded-full`}
      >
        {props.children}
      </Link>
    </>
  );
}
