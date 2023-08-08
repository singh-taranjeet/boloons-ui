"use client";
import {
  classes,
  FontSizeType,
  gap,
  margin,
  padding,
  urls,
} from "@/app/lib/constants";
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
  const fakeName = getRandomInt();
  const [gameId] = useState(getRandomInt());
  const [gameName, setGameName] = useState(`${fakeName}`);
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
      <Card className={`${classes.center} ${margin.marginUp}`}>
        <Sentence className="font-medium">
          Create a new {gameConstants.name} game
        </Sentence>

        {/* Game Name */}
        <section
          className={`${margin.marginUpSmall} ${classes.center} w-full ${gap.small}`}
        >
          <label
            className={`${FontSizeType.normal} ${classes.center} whitespace-nowrap text-primary`}
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
        </section>

        {/* Share the game session url */}
        <section className={`${classes.center} ${margin.marginUp}`}>
          <Sentence>Share this url with players to join</Sentence>
          <Card
            variant="dark"
            className={`${margin.marginUp} ${gap.normal} flex justify-between cursor-pointer`}
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
        </section>
      </Card>

      {/* Players who have joined */}
      <section className={`${margin.marginUpSmall}`}>
        {players.length ? (
          <>
            <Sentence>Players who have joined</Sentence>

            <Card className={`bg-light`}>
              <ul>
                {players.map((player) => {
                  return (
                    <li
                      key={player.id}
                      className={`${FontSizeType.normal} ${margin.marginUp} ${padding.rectangle.normal} bg-light rounded`}
                    >
                      {player.name}
                    </li>
                  );
                })}
              </ul>
            </Card>
          </>
        ) : (
          <Sentence>Waiting for players to join...</Sentence>
        )}
      </section>

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
