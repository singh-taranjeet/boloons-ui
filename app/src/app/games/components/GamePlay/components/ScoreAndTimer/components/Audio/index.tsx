import { ImageContainer } from "@/app/components/ImageContainer";
import { MainAudioType } from "@/app/games/lib/game.types.lib";
import Image from "next/image";

export function Audio(props: MainAudioType) {
  const { mainAudioAllowed, manageMainAudio } = props;

  function onClick() {
    manageMainAudio(!mainAudioAllowed);
  }

  return (
    <ImageContainer>
      <Image
        className={mainAudioAllowed ? "" : "hidden"}
        src={"/media/Audio.webp"}
        width={80}
        height={80}
        onClick={onClick}
        priority={true}
        alt="Audio is on"
      />
      <Image
        className={mainAudioAllowed ? "hidden" : ""}
        src={"/media/Mute.webp"}
        width={80}
        height={80}
        style={{ width: "80px", height: "80px" }}
        priority={true}
        onClick={onClick}
        alt="Audio is mute"
      />
    </ImageContainer>
  );
}
