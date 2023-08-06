import { slice } from "lodash";
import { Number } from "../Number";
interface NumberGridType {
  numbers: number[];
  currentQuestion: number;
}

export function NumberGrid(props: NumberGridType) {
  const { numbers, currentQuestion } = props;

  console.log(
    "numbers",
    slice(numbers, currentQuestion + 1, currentQuestion + 3)
  );

  return (
    <div className="relative">
      <div className="flex justify-center">
        <div>
          <Number number={numbers[currentQuestion]} />
        </div>
        <div className="absolute right-0 h-full flex flex-col justify-center pr-2">
          <div className="flex gap-5 justify-center self-center ml-10">
            {slice(numbers, currentQuestion + 1, currentQuestion + 3).map(
              (number, index) => {
                return (
                  <Number
                    key={`${number}${index}`}
                    number={number}
                    size="small"
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
