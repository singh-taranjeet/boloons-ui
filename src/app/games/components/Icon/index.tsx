import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { flexCenter } from "@/app/lib/style.lib";

interface IconType extends FontAwesomeIconProps {
  className?: string;
}

export default function Icon(props: IconType) {
  return (
    <FontAwesomeIcon
      size="lg"
      className={`p-square mt-n mt-topNormal p-sq p-square-normal gap-small gap-n ${flexCenter}`}
      {...props}
    />
  );
}
