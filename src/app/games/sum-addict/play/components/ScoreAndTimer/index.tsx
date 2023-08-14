import { Sentence } from "@/app/components/Sentence";
import Image from "next/image";
import { flexCenter } from "@/app/lib/style.lib";
import { SinglePlayerScore } from "./components/SinglePlayerScore";
import { MultiplayerScore } from "./components/MultiPlayerScore";
interface InfoType {
  score: number;
  timer: number;
  isMultiPlayer: boolean;
  opponent?: {
    score: number;
    name: string;
  };
}

export function ScoreAndTimer(props: InfoType) {
  const { score, timer, isMultiPlayer, opponent } = props;

  if (isMultiPlayer) {
    return <MultiplayerScore timer={timer} score={score} opponent={opponent} />;
  }

  return <SinglePlayerScore {...props} />;
}
