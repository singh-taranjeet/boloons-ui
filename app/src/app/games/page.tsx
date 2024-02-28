import { Card } from "../components/Card";
import { GameCard } from "../components/GameCard";
import { Heading } from "../components/Heading";
import { AppConstants, urls } from "../lib/constants.lib";

export default function Page() {
  return (
    <section className="flex justify-center flex-col h-full">
      <Heading
        title={AppConstants.pages.games.title}
        description={AppConstants.pages.games.description}
      />

      <div className="flex flex-wrap gap-normal justify-center mt-large">
        <GameCard
          href={urls.pages.games.sumAddict.gameUrl}
          imageSrc={`${urls.media}sum-addiction-logo.png`}
          title={AppConstants.pages.sumAddict.title}
          description={AppConstants.pages.sumAddict.description}
          color="text-neon-yellow"
        />

        <GameCard
          href={urls.pages.games.sharp.gameUrl}
          imageSrc={`${urls.media}sharp-logo.png`}
          title={AppConstants.pages.sharp.title}
          description={AppConstants.pages.sharp.description}
          color="text-neon-green"
        />
      </div>
    </section>
  );
}
