import Link from "next/link";
import { gameConstants } from "../../lib/constants";
import { Sentence } from "@/app/games/components/Sentence";
import { Href } from "@/app/games/components/Link";
import { Card } from "@/app/games/components/Card";

export function GameType() {
  return (
    <Card
      className={`flex flex-col justify-center gap-normal md:row md:justify-between m-top-normal w-fit mx-auto`}
    >
      <Sentence size="normal" className={`text-primary`}>
        How you want to play?
      </Sentence>
      <Href href={`${gameConstants.playUrl}`}>Single player</Href>
      <Href href={`${gameConstants.createUrl}`}>Multi player</Href>
    </Card>
  );
}
