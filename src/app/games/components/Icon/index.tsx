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
      className={`p-square-small text-primary active:bg-secondary rounded-full`}
      {...props}
    />
  );
}
