import Image from "next/image";
import { AppConstants, urls } from "./lib/constants.lib";
import Link from "next/link";
import { Heading } from "./components/Heading";

export default function Page() {
  return (
    <>
      <main className="relative z-1 max-w-5xl mx-auto h-full">
        <section className="flex justify-center flex-col h-full uppercase">
          <Heading
            title={AppConstants.pages.home.title}
            description={AppConstants.pages.home["punch-line"]}
          />

          <Link
            className="mt-large"
            prefetch={true}
            aria-label={AppConstants.pages.home.start}
            href={urls.pages.games.url}
          >
            <Image
              width={250}
              height={228.75}
              className="mx-auto animate-bounce object-contain"
              src={`${urls.media}brain.webp`}
              alt="brain"
            />
          </Link>
        </section>
      </main>
    </>
  );
}
