import { Card } from "../components/Card";
import { GameCard } from "../components/GameCard";
import { AppConstants, urls } from "../lib/constants.lib";

export default function Page() {
  return (
    <section>
      <Card>
        <h1 className="text-primary text-large">
          {AppConstants.pages.games.title}
        </h1>
        <p className="text-black">{AppConstants.pages.games.description}</p>
      </Card>

      <div className="flex flex-wrap gap-normal justify-center mt-normal">
        <GameCard
          href={urls.pages.games.sumAddict.gameUrl}
          imageSrc="/media/sum-addiction-logo.png"
          title={AppConstants.pages.sumAddict.title}
          description={AppConstants.pages.sumAddict.description}
        />

        <GameCard
          href={urls.pages.games.sumAddict.gameUrl}
          imageSrc="/media/sum-addiction-logo.png"
          title={AppConstants.pages.sumAddict.title}
          description={AppConstants.pages.sumAddict.description}
        />
      </div>
    </section>
  );
}
