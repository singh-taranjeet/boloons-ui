import { Card } from "@/app/components/Card";
import { Sentence } from "@/app/components/Sentence";
import { urls } from "@/app/lib/constants.lib";
import { flexCenter } from "@/app/lib/style.lib";
import Image from "next/image";
interface InfoType {
  score: number;
  timer: number;
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
      <div className="flex justify-between border-2 rounded-full border-primary p-2 md:gap-small bg-white">
        <Image
          src={`${urls.media}icons/${url}`}
          width={50}
          height={50}
          alt={alt}
        />
        <div className="relative text-center flex flex-col justify-center md:w-14">
          <Sentence fontSize="text-large" className="absolute right-0">
            {value}
          </Sentence>
        </div>
      </div>
      <Sentence
        fontSize="text-large"
        className="text-center mt-small bg-white p-rectangle-small rounded-full hidden"
        aria-label={title}
      >
        {value}
      </Sentence>
    </div>
  );
}

export function SinglePlayerScore(props: InfoType) {
  const { score, timer } = props;

  return (
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
  );
}
