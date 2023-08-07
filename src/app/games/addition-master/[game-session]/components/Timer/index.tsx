"use client";
import { useEffect, useState } from "react";

const TIMEOUT = 5;

export function Timer(props: { startGame?(): void; duration?: number }) {
  const { startGame, duration = TIMEOUT } = props;
  const [startTimer, setStartTimer] = useState(duration);

  useEffect(() => {
    const timerID = setInterval(() => {
      setStartTimer((timer) => {
        if (timer === 1) {
          if (startGame) {
            startGame();
          }
        }
        return timer - 1;
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timerID);
    }, 1000 * TIMEOUT);
    return () => {
      clearInterval(timerID);
    };
  }, [startGame]);

  return (
    <section className="flex flex-col gap-5">
      <div className="rounded-full border-2 border-cyan-500 w-24 h-24 mx-auto flex flex-col justify-center">
        <p className="text-center text-cyan-500 text-6xl leading-none">
          {startTimer}
        </p>
      </div>
    </section>
  );
}
