import { flexCenter } from "@/app/lib/style.lib";
import Image from "next/image";
import { usePlayer } from "@/app/lib/player-hook.lib";
import { Sentence } from "@/app/components/Sentence";
import { urls } from "@/app/lib/constants.lib";

interface ScoreCardType {
  score: number;
  opponent: {
    score: number;
    name: string;
  };
  isMultiPlayer?: boolean;
}

function UserScore(props: {
  src: string;
  score: number;
  opponent?: boolean;
  playerName: string;
}) {
  const { score, src, opponent = false, playerName } = props;
  return (
    <div className={`${flexCenter} basis-1/2 py-normal px-small`}>
      <div
        className={`flex justify-between gap-small md:gap-normal ${
          opponent ? "flex-row-reverse" : ""
        }`}
      >
        <Image
          src={src}
          width={50}
          height={50}
          alt={`${playerName}`}
          className="rounded-full"
        />
        <div aria-label="score" className={`${flexCenter}`}>
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

/**
 * ScoreCard component
 * @param {number} score - player score
 * @param {object} opponent - opponent score and name
 * @param {boolean} isMultiPlayer - is multiplayer game
 * @returns {JSX.Element} - ScoreCard component
 */
export function ScoreCard(props: ScoreCardType) {
  const { score, opponent, isMultiPlayer = false } = props;

  const { player } = usePlayer();

  console.log("Score Card player", player.name);

  return (
    <div
      className={`flex bg-light rounded ${
        isMultiPlayer ? "justify-between" : "justify-center"
      }`}
    >
      <UserScore
        score={score}
        playerName={player?.name || ""}
        src={`${urls.icons}user-1.png`}
      />
      {isMultiPlayer ? (
        <UserScore
          score={opponent.score}
          playerName={opponent?.name || ""}
          src={`${urls.icons}user-2.png`}
        />
      ) : null}
    </div>
  );
}
