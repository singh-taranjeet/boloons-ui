import { ImageContainer } from "@/app/components/ImageContainer";
import { MainAudioType } from "@/app/games/lib/game.types.lib";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const MusicOn = dynamic(() =>
  import("./Components/index").then((mod) => mod.MusicOn)
);

const MusicOff = dynamic(() =>
  import("./Components/index").then((mod) => mod.MusicOff)
);

const Container = (props: { children: React.ReactNode; classname: string }) => {
  const { classname = "" } = props;
  return (
    <ImageContainer className={classname}>{props.children}</ImageContainer>
  );
};

export function Audio(props: Readonly<MainAudioType>) {
  const { mainAudioAllowed, manageMainAudio } = props;

  function onClick() {
    manageMainAudio(!mainAudioAllowed);
  }

  return (
    <button
      aria-label={mainAudioAllowed ? "Music on" : "Music off"}
      onClick={onClick}
    >
      <Container classname={mainAudioAllowed ? "" : "hidden"}>
        <MusicOn />
      </Container>
      <Container classname={mainAudioAllowed ? "hidden" : ""}>
        <MusicOff />
      </Container>
    </button>
  );
}
