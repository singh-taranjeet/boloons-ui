import { useState } from "react";
import { flexCenter } from "@/app/lib/style.lib";
import { Sentence } from "../../../components/Sentence";
import Image from "next/image";
import { usePlayer } from "@/app/lib/cutom-hooks.lib";

interface ScoreCardType {
  score: number;
  opponent: {
    score: number;
    name: string;
  };
}

function UserScore(props: {
  src: string;
  score: number;
  opponent?: boolean;
  playerName: string;
}) {
  const { score, src, opponent = false, playerName } = props;
  return (
    <div
      className={`${flexCenter} basis-1/2 bg-light rounded py-normal px-small`}
    >
      <div
        className={`flex justify-between gap-small md:gap-normal ${
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
        fontSize="text-small"
        className={`${
          opponent ? "text-right" : "text-left"
        } max-w-fit mt-small`}
      >
        {playerName.trim().substring(0, 10)}
      </Sentence>
    </div>
  );
}

export function ScoreCard(props: ScoreCardType) {
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const { score, opponent } = props;

  const { player } = usePlayer();

  return (
    <div className="flex justify-between">
      <UserScore
        score={score}
        playerName={player?.name || ""}
        src="/images/icons/user-1.png"
      />
      <UserScore
        score={opponent.score}
        playerName={opponent?.name || ""}
        src="/images/icons/user-2.png"
      />
    </div>
  );
}
