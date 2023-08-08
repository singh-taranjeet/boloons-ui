"use client";
import {
  classes,
  colors,
  fontSizes,
  gap,
  margin,
  padding,
  urls,
} from "@/app/lib/constants";
import { faker } from "@faker-js/faker";
import { gameConstants } from "../lib/constants";
import { useEffect, useState } from "react";
import { getRandomInt } from "@/app/lib/server-helper";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useWebSocket } from "@/app/lib/client-helper";
import { Card } from "../../components/Card";
import { TextInput } from "../../components/TextInput";
import { Sentence } from "@/app/games/components/Sentence";
import { Button } from "../../components/Button";
import Link from "next/link";

export default function Page() {
  const fakeName = faker.lorem.word;
  const [gameId] = useState(getRandomInt());
  const [gameName, setGameName] = useState(fakeName);
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [joinUrl, setJoinUrl] = useState("");

  const { socket } = useWebSocket();
  useEffect(() => {
    socket.connect();

    socket.emit("createSession", {
      id: gameId,
      name: gameName,
    });

    // Listen for players
    socket.on(`${gameId}`, (res) => {
      console.log("res", res);
      setPlayers(res.players);
    });
  }, [gameId, gameName, socket]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("sdfsd", pathname, searchParams);

  useEffect(() => {
    setJoinUrl(
      `${window.location.origin}${gameConstants.joinUrl}?id=${gameId}`
    );
  }, [gameId]);

  return (
    <>
      <Sentence className={`${margin.marginUp}`}>
        Create a new {gameConstants.name} game
      </Sentence>
      <Card className={`${margin.marginUp} flex justify-between ${gap.normal}`}>
        <div className={`${classes.center} w-full`}>
          <label
            className={`${fontSizes.normal} ${classes.center} whitespace-nowrap mb-5`}
            htmlFor="game-name"
          >
            Game Name:
          </label>
          <TextInput
            id="game-name"
            type="text"
            name="Game name"
            placeholder="Enter a game name"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
        </div>
      </Card>

      <div className="my-5 flex flex-col justify-between">
        <Sentence>Share this url with players to join</Sentence>
        <Card
          className={`${margin.marginUp} ${padding.square.normal} ${colors.lightBackGroundColor} ${gap.normal} flex justify-between cursor-pointer`}
          onClick={() => navigator.clipboard.writeText(joinUrl)}
        >
          <Sentence className={`${classes.center} whitespace-nowrap`}>
            {"Copy Join url"}
          </Sentence>
          <Image
            src={`${urls.icons}/copy-icon.png`}
            width={25}
            height={25}
            alt={"copy url"}
          />
        </Card>
      </div>

      {/* Players who have joined */}
      {players.length ? (
        <section>
          <Sentence>Players who have joined</Sentence>

          <Card className={`${colors.lightBackGroundColor2}`}>
            <ul>
              {players.map((player) => {
                return (
                  <li
                    key={player.id}
                    className={`${fontSizes.normal} ${margin.marginUp} ${padding.rectangle.normal} ${colors.lightBackGroundColor2} rounded`}
                  >
                    {player.name}
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      ) : (
        <Sentence>Waiting for players to join...</Sentence>
      )}

      {/* Start game */}
      {players.length ? (
        <Card>
          <Link href={`${gameConstants.playUrl}?gameId=${gameId}`}>
            <Button className="w-full">Start game</Button>
          </Link>
        </Card>
      ) : null}
    </>
  );
}
