import { urls } from "@/app/lib/constants.lib";
import Image from "next/image";

export function FingerPointer(props: { className: string }) {
  const { className } = props;
  return (
    <Image
      className={`absolute z-10 animate-bounce ${className}`}
      src={`${urls.media}finger-pointer.svg`}
      width={50}
      height={50}
      alt="select"
      style={{ width: "50px", height: "50px" }}
    />
  );
}
