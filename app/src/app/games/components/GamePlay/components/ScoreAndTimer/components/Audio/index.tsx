import { MainAudioType } from "@/app/games/lib/game.types.lib";
import Image from "next/image";

export function Audio(props: MainAudioType) {
  const { mainAudioAllowed, manageMainAudio } = props;

  function onClick() {
    manageMainAudio(!mainAudioAllowed);
  }

  return (
    <>
      <Image
        className={mainAudioAllowed ? "" : "hidden"}
        src={"/media/Audio.webp"}
        width={80}
        height={80}
        onClick={onClick}
        alt="Audio is on"
      />
      <Image
        className={mainAudioAllowed ? "hidden" : ""}
        src={"/media/Mute.webp"}
        width={80}
        height={80}
        onClick={onClick}
        alt="Audio is mute"
      />
    </>
  );
}
