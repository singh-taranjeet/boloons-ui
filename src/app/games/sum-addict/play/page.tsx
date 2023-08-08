"use client";
import { getRandomInt } from "@/app/lib/server-helper";
import { shuffle, drop, slice } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ScoreAndTimer } from "./components/ScoreAndTimer";
import { Controls } from "./components/Controls";
import { useIsMobile, useWebSocket } from "@/app/lib/client-helper";
import { Game } from "../components/Game";
import { gap, margin } from "@/app/lib/constants";

type DataType = ReturnType<typeof createQuestions>;
const GAME_TIMEOUT = 30000; // 30 Seconds

export default function Page() {
  const [data, setData] = useState<DataType>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);

  const [score, setScore] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);

  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>();
  const [timer, setTimer] = useState(0);

  const correctAnswer = data?.[currentQuestion]?.sum;

  function setQuestions() {
    setData(createQuestions());
  }

  const resetGame = useCallback(function resetGame() {
    setQuestions();
    setCurrentQuestion(0);
    setAttempts([]);
    setScore(0);
    setTimer(30);
  }, []);

  const startGame = useCallback(
    function startGame() {
      if (!gameInProgress) {
        // reset every thing
        resetGame();
        setGameInProgress(() => {
          // start timer
          const id = setInterval(() => {
            console.log("timer is running");
            setTimer((old) => {
              return old - 1;
            });
          }, 1000);

          setTimerId(() => id);

          return true;
        });
      }
    },
    [gameInProgress, resetGame]
  );

  const stopGame = useCallback(
    function stopGame() {
      // stop the timer
      clearInterval(timerId);
      setTimer(GAME_TIMEOUT / 1000);
      setAttempts([]);
      // set game in progress false
      setGameInProgress(false);
    },
    [timerId]
  );

  const nextQuestion = useCallback(
    function nextQuestion() {
      setAttempts([]);
      if (currentQuestion < data.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameInProgress(false);
      }
    },
    [currentQuestion, data.length]
  );

  // Stop the game after timeout
  useEffect(() => {
    if (timerId) {
      setTimeout(stopGame, GAME_TIMEOUT);
    }
  }, [timerId, stopGame]);

  // on attemp change the question and update score
  useEffect(() => {
    if (attempts.length) {
      const sum = attempts.reduce((item, sum) => {
        return item + sum;
      }, 0);

      if (sum === correctAnswer) {
        setScore(score + 5);
        nextQuestion();
      } else if (attempts.length === 3) {
        nextQuestion();
      }
    }
  }, [attempts, score, correctAnswer, nextQuestion]);

  // stop game when all the questions are completed
  useEffect(() => {
    if (currentQuestion >= data.length) {
      stopGame();
    }
  }, [currentQuestion, data.length, stopGame]);

  console.log("Game in Progress", gameInProgress, timerId);

  function onAttempt(attempt: number) {
    console.log("attempt", attempt);
    if (gameInProgress) {
      setAttempts([...attempts, attempt]);
    }
  }

  const isMobile = useIsMobile();
  const { socket } = useWebSocket();

  useEffect(() => {
    socket.connect();
    socket.emit("gameSession", {
      channel: "session",
      message: "thsi is a secret message 89",
    });
    socket.on("newMessage", (body: any) => {
      console.log("body", body);
    });
    console.log("sent real time message");
  }, [socket]);

  return (
    <>
      {/* Score and Timer */}
      <section
        className={`md:flex md:flex-col md:${gap.normal} md:justify-center`}
      >
        <ScoreAndTimer score={score} timer={timer} />
        {!isMobile ? (
          <Controls gameInProgress={gameInProgress} onClick={startGame} />
        ) : null}
      </section>

      {/* Game section */}
      <div className={margin.marginUpSmall}>
        <Game
          currentQuestion={currentQuestion}
          numbers={data.map((item) => item.sum)}
          attempts={attempts}
          onAttempt={onAttempt}
          options={data[currentQuestion]?.options}
        />
      </div>
      {/* Controls */}
      {isMobile ? (
        <Controls gameInProgress={gameInProgress} onClick={startGame} />
      ) : null}
    </>
  );
}

interface QuestionType {
  options: number[];
  answers: number[];
  sum: number;
}

function generateQuestion(): QuestionType {
  const options = drop(Array.from(Array(10).keys()), 1);
  const answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];

  const sum = answers.reduce((item, currentSum) => item + currentSum, 0);

  return {
    options: shuffle(options),
    answers,
    sum,
  };
}

function createQuestions(): QuestionType[] {
  return Array.from(Array(15).keys()).map(() => {
    return generateQuestion();
  });
}
