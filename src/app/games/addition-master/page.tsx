"use client";
import { getRandomInt } from "@/app/lib/server-helper";
import { BoxGrid } from "./components/BoxGrid";
import { NumberGrid } from "./components/NumberGrid";
import { shuffle, drop, slice } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Info } from "./components/Info";
import { Controls } from "./components/Controls";
import { useIsMobile } from "@/app/lib/client-helper";
import { StyledControlWrapper } from "./styles";
import { Heading } from "./components/Heading";
import { StartTimer } from "./components/StartTimer";

type DataType = ReturnType<typeof createQuestions>;
const GAME_TIMEOUT = 30000; // 30 Seconds

export default function Page() {
  const [data, setData] = useState<DataType>([initialQuestion()]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attempts, setAttempts] = useState<number[]>(initialQuestion().answers);
  const [score, setScore] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>();
  const [timer, setTimer] = useState(0);
  const [learningMode, setLearningMode] = useState(true);
  const [startTimer, setStartTimer] = useState(3);

  const correctAnswer = data?.[currentQuestion]?.sum;

  function setQuestions() {
    setData(createQuestions());
  }

  function resetGame() {
    setQuestions();
    setCurrentQuestion(0);
    setAttempts([]);
    setScore(0);
    setTimer(30);
    setLearningMode(false);
  }

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
  }

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

  // Stop the game
  useEffect(() => {
    if (timerId) {
      setTimeout(stopGame, GAME_TIMEOUT);
    }
  }, [timerId, stopGame]);

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

  useEffect(() => {
    if (attempts.length && !learningMode) {
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
  }, [attempts, score, correctAnswer, nextQuestion, learningMode]);

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

  function turnOffLearningMode() {
    if (learningMode) {
      setLearningMode(false);
      setData(createQuestions());
    }
  }

  const isMobile = useIsMobile();

  return (
    <main onClick={turnOffLearningMode}>
      <section className="flex flex-col justify-center gap-4 max-w-5xl mx-auto w-full md:flex-row md:justify-around">
        {learningMode ? (
          <section className="flex flex-col justify-center">
            {/* Heading */}
            <Heading>Addition Master</Heading>
          </section>
        ) : null}

        {/* Score and Timer */}
        {learningMode ? null : (
          <section className="md:flex md:flex-col md:gap-5 md:justify-center">
            <Info score={score} timer={timer} />
            {isMobile ? null : (
              <StyledControlWrapper>
                <Controls gameInProgress={gameInProgress} onClick={startGame} />
              </StyledControlWrapper>
            )}
          </section>
        )}

        <section>
          {/* Questions */}
          <NumberGrid
            currentQuestion={currentQuestion}
            numbers={data.map((item) => item.sum)}
          />
          {/* Answers */}
          <section className="pt-10">
            <BoxGrid
              learningMode={learningMode}
              attempts={attempts}
              onAttempt={onAttempt}
              options={data[currentQuestion]?.options}
            />
          </section>
          {/* Bottom Heading */}
          {learningMode ? (
            <section>
              <Heading className="text-3xl pt-6 md:text-lg md:pt-2">
                Select upto 3 number which sum up equal to the indicated number
              </Heading>
              {isMobile ? <StartTimer startGame={startGame} /> : null}
            </section>
          ) : null}
        </section>
      </section>

      {/* Controls */}
      {isMobile && !learningMode ? (
        <StyledControlWrapper>
          <Controls gameInProgress={gameInProgress} onClick={startGame} />
        </StyledControlWrapper>
      ) : null}
    </main>
  );
}

interface QuestionType {
  options: number[];
  answers: number[];
  sum: number;
}

function initialQuestion(): QuestionType {
  return {
    options: [4, 3, 6, 8, 9, 2, 1, 7, 5],
    answers: [4, 9, 2],
    sum: 18,
  };
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
  return Array.from(Array(10).keys()).map(() => {
    return generateQuestion();
  });
}
