import { Card } from "@/app/components/Card";
import { Sentence } from "@/app/components/Sentence";
import { urls } from "@/app/lib/constants.lib";
import { usePlayer } from "@/app/lib/cutom-hooks.lib";
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
        <div className={`${flexCenter} gap-1`}>
          <Sentence className="text-center">Score</Sentence>
          <Sentence className="text-center">{score}</Sentence>
        </div>
      </div>
      <Sentence
        fontSize="text-small"
        className={`${
          opponent ? "ml-auto" : "text-left"
        } max-w-fit mt-small bg-primary text-white p-rectangle-small rounded-full whitespace-nowrap`}
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
    <Card className="flex justify-between p-normal gap-normal">
      <UserScore
        playerName={player?.name || ""}
        score={score}
        src={`${urls.icons}user-1.png`}
      />

      {/* Timer image */}
      <div className={`flex flex-col justify-center basis-1/3 px-small w-12`}>
        <Image
          src={`${urls.media}icons/timer-icon.gif`}
          height={70}
          width={70}
          style={{ objectFit: "contain" }}
          className="w-full h-full right-0 top-0 left-0 bottom-0 bg-transparent"
          alt={`time ${timer}`}
          loading="lazy"
        />
        <Sentence
          fontSize="text-medium"
          className={`${flexCenter} z-10 pt-2 text-center ${
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
        src={`${urls.icons}user-2.png`}
      />
    </Card>
  );
}
