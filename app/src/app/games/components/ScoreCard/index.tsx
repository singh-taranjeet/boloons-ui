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
        <div
          aria-label={playerName}
          className={`flex flex-col justify-between gap-normal`}
        >
          <Image
            src={src}
            width={50}
            height={50}
            alt={`${playerName}`}
            className="rounded-full h-[50px] self-center"
          />
          <Sentence
            fontSize="text-small"
            className={`${
              opponent ? "text-right" : "text-left"
            } max-w-fit text-xl font-bold`}
          >
            {playerName.trim().substring(0, 10)}
          </Sentence>
        </div>

        <div aria-label="score" className={`${flexCenter} gap-normal`}>
          <Image
            src={`${urls.media}icons/star-icon.png`}
            width={50}
            height={50}
            alt="score"
            className="rounded-full"
          />
          <Sentence className="text-center mt-large text-xl font-bold">
            {score}
          </Sentence>
        </div>
      </div>
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

  // console.log("Score Card player", player.name);

  return (
    <div
      className={`flex rounded ${
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