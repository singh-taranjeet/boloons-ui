import { Sentence } from "@/app/components/Sentence";
import Image from "next/image";
import { flexCenter } from "@/app/lib/style.lib";
interface InfoType {
  score: number;
  timer: number;
}

export function SinglePlayerScore(props: InfoType) {
  const { score, timer } = props;

  return (
    <section className={`${flexCenter} mt-large md:m-0`}>
      {/* Timer image */}
      <div className="flex justify-center">
        <Image
          src={"/images/timer-icon.svg"}
          width={50}
          height={50}
          alt="timer"
          loading="lazy"
        />
      </div>
      <div className={`flex justify-center mt-normal gap-normal`}>
        {/* Score */}
        <div className="flex flex-col justify-between text-emerald-600">
          <Sentence fontSize="text-large" className="text-center">
            Score
          </Sentence>
          <Sentence fontSize="text-large" className="text-center">
            {score}
          </Sentence>
        </div>

        {/* Timer */}
        <div className="flex flex-col justify-between text-red-500">
          <Sentence fontSize="text-large" className="text-center">
            Timer
          </Sentence>
          <Sentence fontSize="text-large" className="text-center">
            {timer}
          </Sentence>
        </div>
      </div>
    </section>
  );
}
