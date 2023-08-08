import { colors, padding } from "@/app/lib/constants";
import Link, { LinkProps } from "next/link";

type LinkType = LinkProps;
interface StyledLinkType extends LinkType {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function Href(props: StyledLinkType) {
  const { className = "" } = props;
  const cx = `rounded ${padding.rectangle.normal} w-full self-center md:w-56 border-${colors.primaryColor} border-2 text-${colors.primaryColor} text-center ${className}`;
  return (
    <>
      <Link {...props} className={cx} />
    </>
  );
}
