import { Card } from "../components/Card";
import { AppConstants } from "../lib/constants.lib";

export default function Page() {
  return (
    <Card className="mt-normal">
      <h1 className="text-primary text-large">
        {AppConstants.pages.games.title}
      </h1>
      <p className="text-black">{AppConstants.pages.games.description}</p>
    </Card>
  );
}
