import Link from "next/link";
import { gameConstants } from "../../lib/constants";
import { colors, gap, padding } from "@/app/lib/constants";
import { Sentence } from "@/app/games/components/Sentence";
import { Href } from "@/app/games/components/Link";

export function GameType() {
  return (
    <section
      className={`flex flex-col justify-center ${gap.normal} md:row md:justify-between ${colors.lightBackGroundColor2} rounded ${padding.square.normal}`}
    >
      <Sentence className={`text-${colors.primaryColor} font-semibold`}>
        How you want to play?
      </Sentence>
      <Href href={`/games/${gameConstants.gameUrl}/play/ddgdgd`}>
        Single player
      </Href>
      <Href href={`/games/${gameConstants.gameUrl}/create`}>Multi player</Href>
    </section>
  );
}
