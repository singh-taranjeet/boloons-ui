import Link from "next/link";
import Image from "next/image";
import { Card } from "../Card";
import { flexCenter } from "@/app/lib/style.lib";
import { Sentence } from "../Sentence";

interface GameCardProps {
  href: string;
  imageSrc: string;
  title: string;
  description: string;
}
export const GameCard = (props: GameCardProps) => {
  const { href, imageSrc, title, description } = props;
  return (
    <Link href={href} aria-label={`Play ${title}`}>
      <Card>
        <div className="flex justify-between">
          <Image
            width={50}
            height={50}
            src={imageSrc}
            alt={title}
            className="animate-bounce"
          />

          <Sentence className={`${flexCenter} text-3xl font-medium`}>
            <span className="flex gap-normal">
              Play {title}{" "}
              <Image
                alt={``}
                width={50}
                height={50}
                className="animate-shake"
                src={"/media/games-logo-small.png"}
              />
            </span>
          </Sentence>
        </div>
        <Sentence className={`${flexCenter} text-small mt-small text-white`}>
          {description}
        </Sentence>
      </Card>
    </Link>
  );
};
