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
      className=" f p-square mt-n mt-topNormal p-sq p-square-normal gap-small gap-n flex-center"
      {...props}
    />
  );
}
