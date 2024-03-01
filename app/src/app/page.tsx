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
            aria-label={AppConstants.pages.home.start}
            href={urls.pages.games.url}
          >
            <Image
              width={250}
              height={250}
              className="object-contain mx-auto mt-small animate-bounce md:w-[350px] md:h-[350px]"
              src={`${urls.media}brain.webp`}
              alt="brain"
            />
          </Link>
          {/* <p className="hidden">{AppConstants.pages.home.description}</p> */}
          {/* <Link
            aria-label={AppConstants.pages.home.start}
            className="fixed bottom-0 right-0 animate-shake w-fit"
            href={urls.pages.games.url}
          >
            <Image
              width={351}
              height={155}
              role="presentation"
              tabIndex={0}
              className="object-contain mx-auto"
              src={`${urls.media}get-started.svg`}
              alt=""
            />
          </Link> */}
        </section>
      </main>
    </>
  );
}
