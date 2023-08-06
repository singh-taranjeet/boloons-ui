import { Number } from "../Number";

export function NumberGrid() {
  return (
    <div className="relative">
      <div className="flex justify-center">
        <div>
          <Number number={9} />
        </div>
        <div className="absolute right-0 h-full flex flex-col justify-center pr-2">
          <div className="flex gap-6 justify-center self-center">
            <Number number={6} size="small" />
            <Number number={8} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
}
