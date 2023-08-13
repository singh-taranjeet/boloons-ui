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
  timer: number;
  opponent?: {
    score: number;
    name: string;
  };
}) {
  const { player } = usePlayer();
  const { score, opponent = { score: 0, name: "" }, timer = 0 } = props;
  const percentage = (timer / 30) * 100;

  return (
    <div className="flex justify-between p-normal gap-normal">
      <UserScore
        playerName={player?.name || ""}
        score={score}
        src="/images/icons/user-1.png"
      />

      {/* Timer image */}
      <div className={`flex justify-center basis-1/3 relative px-small w-12`}>
        <Image
          src={"/images/timer-icon.svg"}
          height={50}
          width={50}
          style={{ objectFit: "contain" }}
          className="absolute w-full h-full right-0 top-0 left-0 bottom-0 bg-transparent"
          alt="timer"
          loading="lazy"
        />
        <Sentence
          size="normal"
          className={`${flexCenter} z-10 pt-2 ${
            percentage > 50
              ? percentage < 75
                ? "text-yellow"
                : ""
              : "text-red"
          }`}
        >
          {timer}
        </Sentence>
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
