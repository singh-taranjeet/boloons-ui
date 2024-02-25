import Image from "next/image";
import type { Metadata } from "next";
import { AppConstants, urls } from "./lib/constants.lib";
import Link from "next/link";
import { Heading } from "./components/Heading";

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
    <>
      <main className="relative z-1 max-w-5xl mx-auto h-full">
        <section className="flex justify-center flex-col h-full uppercase">
          <Heading
            title={AppConstants.pages.home.title}
            description={AppConstants.pages.home["punch-line"]}
          />

          <Image
            width={250}
            height={250}
            role="button"
            tabIndex={0}
            className="object-contain mx-auto mt-small animate-shake md:w-[350px] md:h-[350px]"
            src={"/media/brain.svg"}
            alt=""
          />
          {/* <p className="hidden">{AppConstants.pages.home.description}</p> */}
          <Link
            aria-label={AppConstants.pages.home.start}
            className="fixed bottom-0 right-0 animate-bounce w-fit"
            href={urls.pages.games.url}
          >
            <Image
              width={400}
              height={200}
              role="button"
              tabIndex={0}
              className="object-contain mx-auto"
              src={"/media/get-started.svg"}
              alt=""
            />
          </Link>
        </section>
      </main>
    </>
  );
}
