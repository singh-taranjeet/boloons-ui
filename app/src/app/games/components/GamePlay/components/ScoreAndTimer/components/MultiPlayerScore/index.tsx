import { Card } from "@/app/components/Card";
import { Sentence } from "@/app/components/Sentence";
import { urls } from "@/app/lib/constants.lib";
import { usePlayer } from "@/app/lib/player-hook.lib";
import { flexCenter } from "@/app/lib/style.lib";
import Image from "next/image";
import { Audio } from "../Audio";
import { MainAudioType } from "@/app/games/lib/game.types.lib";
import { ImageContainer } from "@/app/components/ImageContainer";

export const DollarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 37.5 37.5"
      version="1.0"
    >
      <defs>
        <clipPath id="a">
          <path d="M.176.227h36.832v36.78H.176Zm0 0" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          fill="#ffd740"
          d="M18.68.227C8.46.227.176 8.512.176 18.727.176 28.949 8.46 37.23 18.68 37.23c10.218 0 18.504-8.28 18.504-18.503 0-10.215-8.286-18.5-18.504-18.5"
        />
      </g>
      <path
        fill="#f57f17"
        d="M18.68 3.004c-8.684 0-15.727 7.039-15.727 15.723 0 8.687 7.043 15.73 15.727 15.73 8.687 0 15.726-7.043 15.726-15.73 0-8.684-7.039-15.723-15.726-15.723"
      />
      <path
        fill="#ffab00"
        d="M18.68 4.156c-8.684 0-15.727 5.887-15.727 14.57 0 8.688 7.043 15.731 15.727 15.731 8.687 0 15.726-7.043 15.726-15.73 0-8.684-7.039-14.57-15.726-14.57"
      />
      <path
        fill="#f57f17"
        d="M23.781 20.258c-.73-.875-2.117-1.586-4.148-2.137-.121-.035-1.574-.488-1.84-.613-.55-.235-.961-.543-1.234-.93a2.364 2.364 0 0 1-.317-.637c0-.007-.004-.023-.004-.035a2.06 2.06 0 0 1-.105-.652c0-1.281 1.129-2.313 2.52-2.313 1.367 0 2.476.996 2.515 2.246l3.2-.417v-1.157l-.954-1.23v.004a4.554 4.554 0 0 0-.566-.66c-.801-.754-1.871-1.22-3.215-1.38V8.606h-1.84v1.743c-1.457.148-2.625.691-3.5 1.636-.875.942-1.316 2.106-1.316 3.496 0 1.372.39 2.536 1.164 3.497.777.96 1.992 1.675 3.652 2.152.266.086 1.672.496 1.84.547.762.219 1.312.535 1.644.941.332.414.504.906.504 1.473 0 .633-.199 1.187-.597 1.656a2.628 2.628 0 0 1-1.551.883c-.703.117-1.485.023-1.84-.18-.457-.219-.871-.574-1.246-1.066-.375-.492-.625-1.074-.762-1.754l-3.312-.797v1.156c.254 1.668.836 2.957 1.75 3.871.914.914 2.101 1.461 3.57 1.637v1.664h1.84v-1.726c1.648-.235 2.937-.88 3.867-1.93.922-1.05 1.387-2.34 1.387-3.875 0-1.367-.367-2.492-1.106-3.371"
      />
      <path
        fill="#ffd740"
        d="M19.633 16.965c-.121-.035-1.574-.488-1.84-.61-.55-.238-.961-.546-1.234-.933a2.364 2.364 0 0 1-.317-.637c0-.008-.004-.023-.004-.031a2.06 2.06 0 0 1-.105-.656c0-1.282 1.129-2.313 2.52-2.313 1.367 0 2.476 1 2.515 2.246l3.2-.418c-.22-1.27-.727-2.285-1.52-3.039-.801-.758-1.871-1.222-3.215-1.379V7.45h-1.84v1.746c-1.457.145-2.625.688-3.5 1.633-.875.942-1.316 2.11-1.316 3.496 0 1.371.39 2.535 1.164 3.496.777.961 1.992 1.68 3.652 2.157.266.082 1.672.492 1.84.546.762.215 1.312.532 1.644.942.332.41.504.902.504 1.469 0 .632-.199 1.187-.597 1.656a2.628 2.628 0 0 1-1.551.883c-.703.12-1.485.023-1.84-.18-.457-.219-.871-.574-1.246-1.063-.375-.496-.625-1.078-.762-1.757l-3.312.359c.254 1.668.836 2.957 1.75 3.871.914.914 2.101 1.461 3.57 1.637v1.668h1.84v-1.73c1.648-.235 2.937-.88 3.867-1.93.922-1.047 1.387-2.34 1.387-3.875 0-1.368-.367-2.493-1.106-3.371-.73-.872-2.117-1.586-4.148-2.137"
      />
      <path
        fill="#fff"
        d="M12.988 6.422c-3.199.59-3.675 1.066-4.265 4.266-.59-3.2-1.067-3.676-4.266-4.266 3.2-.59 3.676-1.067 4.266-4.266.59 3.2 1.066 3.676 4.265 4.266"
      />
    </svg>
  );
};

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
  const {
    score,
    opponent = { score: 0, name: "" },
    timer = 0,
    mainAudio,
  } = props;
  const percentage = (timer / 30) * 100;

  return (
    <section className="flex flex-col gap-normal mb-normal md:mb-0 ml-normal">
      <div className="w-full flex flex-row justify-center">
        <Audio {...mainAudio} />
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
