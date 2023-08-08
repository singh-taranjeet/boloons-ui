"use client";
import { classes, fontSizes, padding, urls } from "@/app/lib/constants";
import { faker } from "@faker-js/faker";
import { gameConstants } from "../lib/constants";
import { useEffect, useState } from "react";
import { getRandomInt } from "@/app/lib/server-helper";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useWebSocket } from "@/app/lib/client-helper";
import { Card } from "../../components/Card";
import { TextInput } from "../../components/TextInput";
import { Text } from "@/app/games/components/Text";
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
      <Text className="mt-10">Create a new {gameConstants.name} game</Text>
      <Card className="mt-10 flex justify-between gap-5">
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
        <Text>Share this url with players to join</Text>
        <Card
          className="mt-5 p-5 bg-slate-50 gap-5 flex justify-between cursor-pointer"
          onClick={() => navigator.clipboard.writeText(joinUrl)}
        >
          <Text className={`${classes.center} whitespace-nowrap`}>
            {"Copy Join url"}
          </Text>
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
          <Text>Players who have joined</Text>

          <Card className="bg-slate-100">
            <ul>
              {players.map((player) => {
                return (
                  <li
                    key={player.id}
                    className={`${fontSizes.normal} my-5 ${padding.normal} bg-slate-100 rounded`}
                  >
                    {player.name}
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      ) : (
        <Text>Waiting for players to join...</Text>
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
