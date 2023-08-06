import Image from "next/image";

interface InfoType {
  score: number;
  timer: number;
}

export function Info(props: InfoType) {
  const { score, timer } = props;

  return (
    <section className="flex justify-center flex-col">
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
      <div className="flex justify-center gap-8">
        {/* Score */}
        <div className="flex flex-col justify-between text-emerald-600">
          <p className="text-center text-4xl">Score</p>
          <p className="text-center text-6xl">{score}</p>
        </div>

        {/* Timer */}
        <div className="flex flex-col justify-between text-red-500">
          <p className="text-center text-4xl">Timer</p>
          <p className="text-center text-6xl">{timer}</p>
        </div>
      </div>
    </section>
  );
}
