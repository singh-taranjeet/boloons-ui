import { SinglePlayerScore } from "./components/SinglePlayerScore";
import { MultiplayerScore } from "./components/MultiPlayerScore";
import { MainAudioType } from "@/app/games/lib/game.types.lib";
interface InfoType {
  score: number;
  timer: number;
  isMultiPlayer: boolean;
  opponent?: {
    score: number;
    name: string;
  };
  mainAudio: MainAudioType;
}

export function ScoreAndTimer(props: InfoType) {
  const { score, timer, isMultiPlayer, opponent, mainAudio } = props;

  if (isMultiPlayer) {
    return (
      <MultiplayerScore
        mainAudio={mainAudio}
        timer={timer}
        score={score}
        opponent={opponent}
      />
    );
  }

  return <SinglePlayerScore {...props} />;
}
