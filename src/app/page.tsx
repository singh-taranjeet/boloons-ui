import Image from "next/image";
import type { Metadata } from "next";
import { Card } from "./components/Card";
import { Sentence } from "./components/Sentence";
import { flexCenter } from "./lib/style.lib";
import Link from "next/link";
import { urls } from "./lib/constants.lib";

const description = `On Boloons you can play free online games to sharpen your brain. Boloons has the best online game selection and offers the most fun experience to play alone or with friends. We support mobile and desktop games.`;
const title = `Online Brain games on Boloons - Lets play`;
export const metadata: Metadata = {
  title,
  description,
  applicationName: "Boloons",
  openGraph: {
    type: "website",
    description,
    title,
    images: "",
  },
  authors: { name: "Taranjeet Singh" },
};

export default function Page() {
  return (
    <main className="relative z-1">
      <Card className={`m-normal`}>
        <h1 className="text-primary text-center text-large">Boloons</h1>
      </Card>
      <section className="mx-normal flex flex-col gap-small md:flex-row md:mx-auto">
        <section className="relative h-[15rem] w-[15rem] m-normal md:mx-normal md:w-1/2">
          <Image
            fill={true}
            className=" object-contain"
            src={"/media/space-craft.svg"}
            alt="sum addiction logo"
          />
        </section>
        <Card className="md:w-1/2 my-auto md:mx-normal">
          <Sentence>
            Boloons keeps you entertained with its unbeatable selection of free
            online games. Play today and enjoy some quality time with your
            friends!
          </Sentence>
        </Card>
      </section>

      <section className="mx-normal mt-normal md:w-fit md:mx-auto border-2 rounded border-primary">
        <Link href={urls.pages.games.sumAddict.gameUrl}>
          <Card>
            <div className="flex justify-between">
              <Image
                width={50}
                height={50}
                src={"/media/sum-addiction-logo.png"}
                alt="sum addiction logo"
              />

              <Sentence
                className={`${flexCenter} text-large font-medium`}
                // color="text-black"
              >
                Play Sum addiction
              </Sentence>
            </div>
            <Sentence className={`${flexCenter} text-small mt-small`}>
              Select upto 3 number which sum up equal to the indicated number
            </Sentence>
          </Card>
        </Link>
      </section>
    </main>
  );
}
