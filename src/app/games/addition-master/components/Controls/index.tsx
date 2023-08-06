import { useIsMobile } from "@/app/lib/client-helper";
import Image from "next/image";
export function Controls(props: { onClick(): void; gameInProgress: boolean }) {
  const { onClick, gameInProgress } = props;

  const isMobile = useIsMobile();
  console.log("ismoble", isMobile);

  if (gameInProgress) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className="select-none flex justify-center rounded-md p-5 w-fit h-fit bg-cyan-500 mx-auto"
    >
      <p className="m-auto text-4xl text-white">Restart</p>
    </div>
  );
}
