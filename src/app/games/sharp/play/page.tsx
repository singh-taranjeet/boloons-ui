import { getRandomInt } from "@/app/lib/server.lib";
import { Game } from "../components/Game";
import { QuestionType } from "../../lib/game.types.lib";
import { urls } from "@/app/lib/constants.lib";
import { GamePlay } from "../../components/GamePlay";
import { drop } from "lodash";

async function isCorrectAttempt(userAttempts: number[], correctAnswer: number) {
  "use server";
  const attempt = userAttempts[0] === correctAnswer;
  if (attempt) {
    return true;
  }
  return undefined;
}

export default function Page() {
  return (
    <GamePlay
      gameUrl={urls.pages.games.sharp.gameUrl}
      isCorrectAttempt={isCorrectAttempt}
      Game={Game}
      createQuestions={createQuestions}
    />
  );
}

// create question
async function createQuestions(): Promise<QuestionType[]> {
  "use server";
  const res = await Promise.all(
    Array.from(Array(15).keys()).map(async () => {
      return await generateQuestion();
    })
  );

  console.log("res", res);

  return new Promise((resolve) => {
    resolve(res);
  });
}
// 1 + 2 = 3 -> Is is right or wrong
async function generateQuestion(): Promise<QuestionType> {
  "use server";

  // + 1
  // - 2
  // * 3
  // / 4

  const option1 = getRandomInt(20);
  const operation = getRandomInt(5);
  const option2 = getRandomInt(20);

  const answer = (() => {
    switch (operation) {
      case 1: {
        return option1 + option2;
      }
      case 2: {
        return option1 - option2;
      }
      case 3: {
        return option1 * option2;
      }
      default: {
        return option1 / option2;
      }
    }
  })();

  const isTrue = getRandomInt(3) === 1;

  if (!isTrue) {
  }

  const wrongAnswer = (() => {
    const quest: number[] = [];
    const random = getRandomInt(5);
    function setRandom() {
      switch (random) {
        case 1: {
          quest.push(option1 + 1);
          break;
        }
        case 2: {
          if (operation > random) {
            quest.push(operation + 1);
          } else {
            quest.push(operation - 1);
          }
          break;
        }
        case 3: {
          quest.push(option2 + 1);
          break;
        }
        case 4: {
          quest.push(Number(answer.toFixed(2)));
        }
      }
    }
    drop(Array.from(Array(5).keys()), 1).forEach((item) => {
      if (item === random) {
        setRandom();
      } else {
        quest.push(item);
      }
    });
    return quest;
  })();

  return {
    options: isTrue ? [option1, operation, option2, answer] : wrongAnswer,
    answers: [0, 1],
    correctAnswer: isTrue ? 1 : 0,
  };
}
