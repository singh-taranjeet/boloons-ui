import Link from "next/link";
import { gameConstants } from "../../lib/constants";
import { colors, gap, padding } from "@/app/lib/constants";
import { Sentence } from "@/app/games/components/Sentence";
import { Href } from "@/app/games/components/Link";

export function GameType() {
  return (
    <section
      className={`flex flex-col justify-center ${gap.normal} md:row md:justify-between ${colors.backGroundColorLight} rounded ${padding.square.normal}`}
    >
      <Sentence className={`text-primary font-semibold`}>
        How you want to play?
      </Sentence>
      <Href href={`${gameConstants.playUrl}`}>Single player</Href>
      <Href href={`${gameConstants.createUrl}`}>Multi player</Href>
    </section>
  );
}
