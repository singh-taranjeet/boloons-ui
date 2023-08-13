import { FontSizeType } from "@/app/lib/constants";
import Link, { LinkProps } from "next/link";

type LinkType = LinkProps;
interface StyledLinkType extends LinkType {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function Href(props: StyledLinkType) {
  const { className = "" } = props;
  const cx = `rounded bg-white p-rectangle-normal ${FontSizeType.normal} w-full self-center md:w-56 border-primary border-2 text-primary text-center ${className}`;
  return <Link {...props} className={cx} />;
}
