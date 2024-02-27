"use client";
import { getRandomInt } from "@/app/lib/server.lib";
import { shuffle, drop } from "lodash";
import { Game } from "../components/Game";
import { QuestionType } from "../../lib/game.types.lib";
import { urls } from "@/app/lib/constants.lib";
import { GamePlay } from "../../components/GamePlay";

function isCorrectAttempt(userAttempts: number[], correctAnswer: number) {
  const sum = userAttempts.reduce((item, sum) => {
    return item + sum;
  }, 0);
  // console.log("user", userAttempts, correctAnswer);
  const attempt = sum === correctAnswer;
  if (attempt) {
    return true;
  } else if (userAttempts.length === 3) {
    return undefined;
  }
  return false;
}

export default function Page() {
  return (
    <GamePlay
      gameUrl={urls.pages.games.sumAddict.gameUrl}
      isCorrectAttempt={isCorrectAttempt}
      Game={Game}
      createQuestions={createQuestions}
    />
  );
}

function createQuestions(): QuestionType[] {
  return Array.from(Array(15).keys()).map(() => {
    return generateQuestion();
  });
}

function generateQuestion(): QuestionType {
  const options = drop(Array.from(Array(10).keys()), 1);
  const answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];

  const sum = answers.reduce((item, currentSum) => item + currentSum, 0);

  return {
    options: shuffle(options),
    answers,
    correctAnswer: sum,
  };
}
