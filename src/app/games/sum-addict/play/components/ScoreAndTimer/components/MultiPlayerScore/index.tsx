import { Sentence } from "@/app/games/components/Sentence";
import { usePlayer } from "@/app/lib/cutom-hooks";
import { flexCenter } from "@/app/lib/style.lib";
import Image from "next/image";

function UserScore(props: {
  src: string;
  score: number;
  opponent?: boolean;
  playerName: string;
}) {
  const { score, src, opponent = false, playerName } = props;
  return (
    <div className={`${flexCenter} basis-1/3`}>
      <div
        className={`flex justify-between gap-normal ${
          opponent ? "flex-row-reverse" : ""
        }`}
      >
        <Image
          src={src}
          width={50}
          height={50}
          alt={playerName}
          className="rounded-full"
        />
        <div className={`${flexCenter}`}>
          <Sentence className="text-center">Score</Sentence>
          <Sentence className="text-center">{score}</Sentence>
        </div>
      </div>
      <Sentence
        size="small"
        className={`${
          opponent ? "text-right" : "text-left"
        } max-w-fit mt-small`}
      >
        {playerName.trim().substring(0, 10)}
      </Sentence>
    </div>
  );
}

export function MultiplayerScore(props: {
  score: number;
  opponent?: {
    score: number;
    name: string;
  };
}) {
  const { player } = usePlayer();
  const { score, opponent = { score: 0, name: "" } } = props;

  return (
    <div className="flex justify-between p-square-normal">
      <UserScore
        playerName={player?.name || ""}
        score={score}
        src="/images/icons/user-1.png"
      />

      {/* Timer image */}
      <div className="flex justify-center">
        <Image
          src={"/images/timer-icon.svg"}
          width={50}
          height={50}
          alt="timer"
          loading="lazy"
        />
      </div>

      <UserScore
        opponent={true}
        playerName={opponent.name || ""}
        score={opponent.score}
        src="/images/icons/user-2.png"
      />
    </div>
  );
}
