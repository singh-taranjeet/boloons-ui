import { BoxGrid } from "./components/BoxGrid";
import { NumberGrid } from "./components/NumberGrid";

export default function Page() {
  return (
    <main className="flex flex-col justify-center gap-4 max-w-5xl mx-auto w-full">
      <NumberGrid></NumberGrid>
      <BoxGrid></BoxGrid>
    </main>
  );
}
