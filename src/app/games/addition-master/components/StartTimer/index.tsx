import { useEffect, useState } from "react";
import { Number } from "../Number";

export function StartTimer(props: { startGame(): void }) {
  const { startGame } = props;
  const [startTimer, setStartTimer] = useState(9);

  useEffect(() => {
    const timerID = setInterval(() => {
      setStartTimer((timer) => {
        if (timer === 1) {
          startGame();
        }
        return timer - 1;
      });
    }, 1000);
    return () => {
      console.log("cleared", timerID);
      clearInterval(timerID);
    };
  }, [startTimer, startGame]);

  return (
    <section className="flex flex-col gap-5">
      <p className="text-center text-cyan-500 text-5xl">Game starting in</p>
      <div className="rounded-full border-2 border-cyan-500 w-24 h-24 mx-auto flex flex-col justify-center">
        <p className="text-center text-cyan-500 text-6xl leading-none">
          {startTimer}
        </p>
      </div>
    </section>
  );
}
