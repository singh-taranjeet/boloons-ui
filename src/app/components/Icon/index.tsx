import { StyleConstants } from "@/app/lib/style.lib";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface IconType extends FontAwesomeIconProps {
  className?: string;
}

export default function Icon(props: IconType) {
  return (
    <FontAwesomeIcon
      size="lg"
      {...props}
      className={`${
        props.color ? props.color : StyleConstants.Color["text-primary"]
      } active:bg-secondary ${
        StyleConstants.BorderRadius["rounded-full"]
      } leading-none ${props.className}`}
    />
  );
}
