import { getRandomInt } from "@/app/lib/server.lib";
import { shuffle, drop } from "lodash";
import { Game } from "../components/Game";
import { QuestionType } from "../../lib/game.types.lib";
import { urls } from "@/app/lib/constants.lib";
import { GamePlay } from "../../components/GamePlay";

async function isCorrectAttempt(userAttempts: number[], correctAnswer: number) {
  "use server";
  const sum = userAttempts.reduce((item, sum) => {
    return item + sum;
  }, 0);
  return sum === correctAnswer;
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

async function createQuestions(): Promise<QuestionType[]> {
  "use server";
  const res = await Promise.all(
    Array.from(Array(15).keys()).map(async () => {
      return await generateQuestion();
    })
  );

  return new Promise((resolve, reject) => {
    resolve(res);
  });
}

async function generateQuestion(): Promise<QuestionType> {
  "use server";
  const options = drop(Array.from(Array(10).keys()), 1);
  const answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];

  const sum = answers.reduce((item, currentSum) => item + currentSum, 0);

  return {
    options: shuffle(options),
    answers,
    correctAnswer: sum,
  };
}
