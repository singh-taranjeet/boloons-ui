import Link from "next/link";
import Image from "next/image";
import { Card } from "../Card";
import { flexCenter } from "@/app/lib/style.lib";
import { Sentence } from "../Sentence";
import { urls } from "@/app/lib/constants.lib";
import { ImageContainer } from "../ImageContainer";

interface GameCardProps {
  href: string;
  imageSrc: string;
  title: string;
  description: string;
  color: string;
}
export const GameCard = (props: GameCardProps) => {
  const { href, imageSrc, title, description, color } = props;
  return (
    <Link href={href} aria-label={`Play ${title}`}>
      <Card>
        <div className="flex justify-between">
          <ImageContainer>
            <Image
              width={50}
              height={50}
              src={imageSrc}
              alt={title}
              className="animate-bounce"
            />
          </ImageContainer>

          <span className={`${flexCenter} font-medium`}>
            <span className="flex gap-normal">
              <span className={`${flexCenter} text-2xl font-bold ${color}`}>
                Play {title}{" "}
              </span>
              <ImageContainer>
                <Image
                  alt={`game-controller`}
                  width={50}
                  height={50}
                  className="animate-shake"
                  src={`${urls.media}blue-controller.webp`}
                />
              </ImageContainer>
            </span>
          </span>
        </div>
        <Sentence className={`${flexCenter} text-small mt-small text-white`}>
          {description}
        </Sentence>
      </Card>
    </Link>
  );
};
