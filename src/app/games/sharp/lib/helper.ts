import { EquationType, QuestionType } from "./types";
import { getRandomInt } from "@/app/lib/server.lib";

export function generateQuestion(): QuestionType {
  // 1. Generate random equation
  const equation = getEquation();
  // 2. Calculate answer
  const answer = (() => {
    const first = equation[0].value;
    const operator = equation[1].value;
    const second = equation[2].value;
    switch (operator) {
      case 0: {
        return first + second;
      }

      case 1: {
        return first - second;
      }
      case 2: {
        return first * second;
      }
      case 3: {
        return first / second;
      }

      default: {
        return 0;
      }
    }
  })();

  // 3. Omit one place in 0, 1, 2, 4
  const omittedPosition = 1;
  // TODO const omittedPosition = getRandomInt(4);

  // 5. store the answer
  equation.push({
    id: getRandomInt(),
    value: answer,
  });
  return {
    equation,
    omittedPosition,
  };
}

function getEquation(): EquationType[] {
  // 0 -> ADD, 1 -> SUB, 2 -> MUL, 3 -> DIV
  return [
    { id: getRandomInt(), value: getRandomInt(10) },
    { id: getRandomInt(), value: getRandomInt(4) },
    { id: getRandomInt(), value: getRandomInt(10) },
  ];
}
