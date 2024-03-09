"use client";
import { getRandomInt } from "@/app/lib/server.lib";
import { Game } from "../components/Game";
import { QuestionType } from "../../lib/game.types.lib";
import { urls } from "@/app/lib/constants.lib";
import { GamePlay } from "../../components/GamePlay";
import confetti from "canvas-confetti";

function isCorrectAttempt(userAttempts: number[], correctAnswer: number) {
  const attempt = userAttempts[0] === correctAnswer;
  if (attempt) {
    confetti();
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
function createQuestions(): QuestionType[] {
  return Array.from(Array(15).keys()).map(() => {
    return generateQuestion();
  });
}
// 1 + 2 = 3 -> Is is right or wrong
function generateQuestion(): QuestionType {
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

  const wrongAnswer = (() => {
    let first = option1;
    let second = option2;
    const random = getRandomInt(3);
    function setRandom() {
      switch (random) {
        case 1: {
          first = option1 + 1;
          break;
        }
        case 2: {
          second = option2 + 1;
          break;
        }
      }
    }
    setRandom();
    return [first, operation, second, answer];
  })();

  return {
    options: isTrue ? [option1, operation, option2, answer] : wrongAnswer,
    answers: [0, 1],
    correctAnswer: isTrue ? 1 : 0,
  };
}
