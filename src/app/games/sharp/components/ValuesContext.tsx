"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { EquationType, QuestionType } from "../lib/types";
import { generateQuestion, getRandomInt } from "../lib/helper";

const SCORE = {
  RIGHT: 5,
  WRONG: -2,
};

// 0 -> ADD, 1 -> SUB, 2 -> MUL, 3 -> DIV
const equation: EquationType[] = [
  { id: getRandomInt(), value: 7 },
  { id: getRandomInt(), value: 0 },
  { id: getRandomInt(), value: 3 },
  { id: getRandomInt(), value: 10 },
];

interface ContextState extends QuestionType {
  score: {
    current: number;
    history: number[];
  };
  game: {
    timer: number;
    gameInProgress: boolean;
  };
}

interface ContextType extends ContextState {
  generateNextQuestion(incrementScore: boolean): void;
  startGame(): void;
  stopGame(): void;
}

const initialState: ContextState = {
  equation,
  omittedPosition: 1,
  score: {
    current: 0,
    history: [],
  },
  game: {
    timer: 0,
    gameInProgress: false,
  },
};

const initialContext = {
  ...initialState,
  generateNextQuestion: () => {},
  startGame: () => {},
  stopGame: () => {},
};

const ValuesContext = createContext<ContextType>(initialContext);

function ValuesProvider(props: {
  children: React.ReactNode;
  firstQuestion: QuestionType;
}) {
  const { children, firstQuestion } = props;
  const [values, setValues] = useState<ContextState>({
    ...initialState,
    ...firstQuestion,
  });
  const [timerId, setTimerId] = useState<NodeJS.Timer | undefined>();

  function generateNextQuestion(incrementScore: boolean): void {
    setValues((oldValue) => {
      return {
        ...oldValue,
        ...generateQuestion(),
        score: {
          ...oldValue.score,
          current:
            oldValue.score.current +
            (incrementScore ? SCORE.RIGHT : SCORE.WRONG),
        },
      };
    });
  }

  function startGame() {
    // reset score, timer and start game
    setValues({
      ...values,
      score: {
        ...values.score,
        current: 0,
      },
      game: {
        ...values.game,
        timer: 0,
        gameInProgress: true,
      },
    });
    // start timer
    const timerId = setInterval(() => {
      setValues((oldValues) => {
        // console.log('Old values', oldValues);
        return {
          ...oldValues,
          game: {
            ...values.game,
            timer: oldValues.game.timer + 1,
            gameInProgress: true,
          },
        };
      });
    }, 1000);

    setTimerId(timerId);
  }

  console.log("Values", values, values.equation);

  const stopGame = useCallback(
    function stopGame() {
      // 1. Stop timer
      clearInterval(timerId);
      // 2. set game in progress to false
      setValues((oldValues) => {
        const history = [...oldValues.score.history, oldValues.score.current]
          .sort((a, b) => a - b)
          .reverse()
          .slice(0, 3);
        // .slice(0, 3);
        localStorage.setItem("history", JSON.stringify(history));
        return {
          ...oldValues,
          score: {
            ...oldValues.score,
            history,
          },
          game: {
            ...oldValues.game,
            gameInProgress: false,
          },
        };
      });
    },
    [timerId]
  );

  useEffect(() => {
    if (timerId) {
      setTimeout(stopGame, 10000);
    }
  }, [timerId, stopGame]);

  useEffect(() => {
    const localHistory = JSON.parse(localStorage.getItem("history") || "[]");

    setValues((val) => {
      return {
        ...val,
        score: {
          ...val.score,
          history: localHistory,
        },
      };
    });
  }, []);

  return (
    <ValuesContext.Provider
      value={{
        ...values,
        generateNextQuestion,
        startGame,
        stopGame,
      }}
    >
      {children}
    </ValuesContext.Provider>
  );
}

function useValues() {
  return useContext(ValuesContext);
}

export { useValues, ValuesProvider, ValuesContext };
