import Image from "next/image";
import type { Metadata } from "next";
import { Card } from "./components/Card";
import { Sentence } from "./components/Sentence";
import { flexCenter } from "./lib/style.lib";
import Link from "next/link";
import { AppConstants, urls } from "./lib/constants.lib";

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
      <Card variant="bg-white" className={`m-normal w-fit mx-auto`}>
        <div className="flex gap-normal">
          <Image
            width={100}
            height={100}
            src={"/media/boloons-logo.png"}
            alt="boloons"
          />
          <h1
            title="Boloons"
            className={`text-center text-large text-primary ${flexCenter}`}
          >
            Boloons
          </h1>
        </div>
      </Card>
      <section className="mx-normal flex flex-col gap-small md:flex-row md:mx-auto">
        <section className="relative h-[15rem] w-[15rem] m-normal md:mx-normal md:w-1/2 self-center">
          <Image
            fill={true}
            className="object-contain mx-auto sm:w-1/2"
            src={"/media/space-craft.svg"}
            alt="space-craft"
          />
        </section>
        <Card
          className="md:w-1/2 my-auto md:mx-normal"
          aria-label="About boloons"
        >
          <Sentence>{AppConstants.pages.home.description}</Sentence>
        </Card>
      </section>

      <section className="mx-normal mt-normal md:w-fit md:mx-auto">
        <Link
          href={urls.pages.games.sumAddict.gameUrl}
          title="Play sum addiction"
        >
          <Card>
            <div className="flex justify-between">
              <Image
                width={50}
                height={50}
                src={"/media/sum-addiction-logo.png"}
                alt="sum addiction logo"
              />

              <Sentence className={`${flexCenter} text-large font-medium`}>
                Play {AppConstants.pages.sumAddict.title}
              </Sentence>
            </div>
            <Sentence className={`${flexCenter} text-small mt-small`}>
              {AppConstants.pages.sumAddict.description}
            </Sentence>
          </Card>
        </Link>
      </section>
    </main>
  );
}
