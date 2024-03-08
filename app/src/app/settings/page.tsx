import { Card } from "../components/Card";
import { Player } from "../components/Player";

export default function Page() {
  return (
    <main className="relative mt-48 md:mx-auto mx-normal md:w-1/2">
      <Card>
        <h1 className="text-primary text-xl">Settings</h1>
      </Card>

      <Card className="mt-normal">
        <h2 className="text-primary text-lg">Name</h2>
        <Player />
      </Card>
    </main>
  );
}