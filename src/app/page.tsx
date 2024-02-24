import Image from "next/image";
import type { Metadata } from "next";
import { Card } from "./components/Card";
import { Sentence } from "./components/Sentence";
import { AppConstants, urls } from "./lib/constants.lib";
import { GameCard } from "./components/GameCard";

export const metadata: Metadata = {
  title: AppConstants.metaData.title,
  description: AppConstants.metaData.description,
  applicationName: "Boloons",
  openGraph: {
    type: "website",
    title: AppConstants.metaData.title,
    description: AppConstants.metaData.description,
    images: "",
  },
  authors: { name: "Taranjeet Singh" },
};

export default function Page() {
  return (
    <main className="relative z-1 max-w-5xl mx-auto">
      <section
        className={`m-normal w-fit mx-auto flex justify-center flex-col md:flex-row`}
      >
        <Image
          width={400}
          height={180}
          src={"/media/boloons-hero.svg"}
          alt="boloons"
        />
        <h1 title="Boloons" className={`hidden`}>
          Boloons
        </h1>

        <Image
          width={420}
          height={54}
          src={"/media/boloons-hero-text.svg"}
          alt="train your brain"
        />
      </section>
      <section className="mx-normal flex flex-col gap-small md:flex-row md:mx-auto">
        <section className="relative m-normal md:mx-normal md:w-1/2 self-center">
          <picture>
            <source srcSet="/media/spacecraft.svg" media="(min-width: 768px)" />
            <Image
              width={200}
              height={200}
              className="object-contain mx-auto w-28"
              src={"/media/spacecraft-mobile.png"}
              alt="space-craft"
            />
          </picture>
        </section>
        <Card
          className="md:w-1/2 my-auto md:mx-normal"
          aria-label="About boloons"
        >
          <Sentence>{AppConstants.pages.home.description}</Sentence>
        </Card>
      </section>

      <section className="mx-normal mt-normal md:w-fit md:mx-auto">
        <GameCard
          href={urls.pages.games.sumAddict.gameUrl}
          imageSrc="/media/sum-addiction-logo.png"
          title={AppConstants.pages.sumAddict.title}
          description={AppConstants.pages.sumAddict.description}
        />
      </section>
    </main>
  );
}
