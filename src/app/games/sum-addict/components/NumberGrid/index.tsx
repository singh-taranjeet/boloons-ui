import { slice } from "lodash";
import { Number } from "../Number";
interface NumberGridType {
  numbers: number[];
  currentQuestion: number;
}

export function NumberGrid(props: NumberGridType) {
  const { numbers, currentQuestion } = props;

  return (
    <div className="relative">
      <div className="flex justify-center">
        <div className="border-2 border-primary rounded py-small p-4 bg-opacity-60 bg-pink-700">
          <Number label="question" number={numbers[currentQuestion]} />
        </div>
        <div className="absolute right-0 h-full flex flex-col justify-center pr-2">
          <div className={`flex gap-normal justify-center self-center ml-10`}>
            {slice(numbers, currentQuestion + 1, currentQuestion + 3).map(
              (number, index) => {
                return (
                  <Number
                    key={`${number}${index}`}
                    number={number}
                    fontSize="text-small"
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
