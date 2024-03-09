import { Card } from "@/app/components/Card";
import { Sentence } from "@/app/components/Sentence";
import { urls } from "@/app/lib/constants.lib";
import { usePlayer } from "@/app/lib/player-hook.lib";
import { flexCenter } from "@/app/lib/style.lib";
import Image from "next/image";
import { Audio } from "../Audio";
import { MainAudioType } from "@/app/games/lib/game.types.lib";
import { ImageContainer } from "@/app/components/ImageContainer";
import { Href } from "@/app/components/Href";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";

function UserScore(
  props: Readonly<{
    src: string;
    score: number;
    opponent?: boolean;
    playerName: string;
  }>
) {
  const { score, src, opponent = false, playerName } = props;
  return (
    <div className={`${flexCenter} mx-auto`}>
      <div
        className={`flex flex-col xs:flex-row gap-small xs:gap-normal ${
          opponent ? "xs:flex-row-reverse" : ""
        }`}
      >
        <ImageContainer>
          <Image
            src={src}
            width={50}
            height={50}
            alt={playerName}
            className="rounded-full"
          />
        </ImageContainer>
        <div className={`flex gap-normal`}>
          <Sentence
            className={`text-center bg-primary text-white rounded-full p-rectangle-small text-small ${flexCenter}`}
          >
            {score}
          </Sentence>
        </div>
      </div>
      <Sentence
        fontSize="text-small"
        className={`hidden xs:block ${
          opponent ? "ml-auto" : "text-left"
        } max-w-fit mt-small bg-primary text-white p-rectangle-small rounded-full whitespace-nowrap`}
      >
        {playerName.trim().substring(0, 10)}
      </Sentence>
    </div>
  );
}

export function MultiplayerScore(
  props: Readonly<{
    score: number;
    timer: number;
    opponent?: {
      score: number;
      name: string;
    };
    mainAudio: MainAudioType;
  }>
) {
  const { player } = usePlayer();
  const router = useRouter();
  const {
    score,
    opponent = { score: 0, name: "" },
    timer = 0,
    mainAudio,
  } = props;
  const percentage = (timer / 30) * 100;

  return (
    <section className="flex flex-col gap-normal mb-normal md:mb-0 ml-normal">
      <div className="w-full flex flex-row justify-center gap-normal">
        <Audio {...mainAudio} />
        <Button
          className={`z-12 p-rectangle-normal routed-full font-extrabold md:hidden h-fit ${flexCenter} my-auto`}
          onClick={() => router.back()}
        >
          Exit
        </Button>
      </div>
      <Card className="flex flex-row justify-between p-normal gap-normal ">
        <UserScore
          playerName={player?.name || ""}
          score={score}
          src={`${urls.icons}user-1.png`}
        />

        <div className={`flex flex-col justify-center px-small relative`}>
          <ImageContainer className="mx-auto">
            <Image
              src={`${urls.media}icons/timer-icon.webp`}
              height={70}
              width={70}
              style={{ objectFit: "contain" }}
              className="mx-auto bg-transparent animate-pulse self-center"
              alt={`time ${timer}`}
            />
          </ImageContainer>
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
    </section>
  );
}
