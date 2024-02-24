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
    <Link href={href} title={`Play ${title}`}>
      <Card>
        <div className="flex justify-between">
          <Image width={50} height={50} src={imageSrc} alt={title} />

          <Sentence className={`${flexCenter} text-large font-medium`}>
            Play {title}
          </Sentence>
        </div>
        <Sentence className={`${flexCenter} text-small mt-small`}>
          {description}
        </Sentence>
      </Card>
    </Link>
  );
};
