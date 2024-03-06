import { Sentence } from "@/app/components/Sentence";
import { urls } from "@/app/lib/constants.lib";
import { flexCenter, pinkish } from "@/app/lib/style.lib";
import Image from "next/image";
import { Audio } from "../Audio";
import { MainAudioType } from "@/app/games/lib/game.types.lib";
interface InfoType {
  score: number;
  timer: number;
  mainAudio: MainAudioType;
}

function Entity(props: {
  url: string;
  alt: string;
  title: string;
  value: number;
}) {
  const { url, alt, title, value } = props;
  return (
    <div className="flex flex-col justify-between flex-1 md:min-w-full">
      <div
        className={`flex justify-between border-2 rounded-full border-primary p-2 md:gap-small ${pinkish} bg-opacity-60`}
      >
        <Image
          src={`${urls.media}icons/${url}`}
          width={50}
          height={50}
          alt={alt}
        />
        <div className="relative text-center flex flex-col justify-center md:w-14">
          <Sentence
            aria-label={`${title.toLowerCase() || ""}`}
            fontSize="text-large"
            className="absolute right-0"
          >
            {value}
          </Sentence>
        </div>
      </div>
    </div>
  );
}

export function SinglePlayerScore(props: InfoType) {
  const { score, timer, mainAudio } = props;

  return (
    <section className="flex flex-col gap-normal">
      <div className="w-full flex flex-row justify-center">
        <Audio {...mainAudio} />
      </div>
      <section className={`${flexCenter} m-normal`}>
        <div className={`flex justify-between gap-normal md:flex-col`}>
          {/* Score */}
          <Entity
            url="star-icon.png"
            title="Score"
            value={score}
            alt="Score icon"
          />

          {/* Timer */}
          <Entity
            url="timer-icon.svg"
            title="Time"
            value={timer}
            alt="Timer icon"
          />
        </div>
      </section>
    </section>
  );
}
