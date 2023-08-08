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
import { Href } from "../../components/Link";

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
          <div
            className={`${margin.marginUp} ${gap.normal} flex justify-between cursor-pointer bg-light ${padding.square.normal} rounded`}
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
          </div>
        </section>
      </Card>

      {/* Players who have joined */}
      <Card className={`${margin.marginUpSmall}`}>
        {players.length ? (
          <>
            <Sentence>Players who have joined</Sentence>

            <ul>
              {players.map((player) => {
                return (
                  <li
                    key={player.id}
                    className={`${FontSizeType.normal} text-primary ${margin.marginUpSmall} ${padding.rectangle.normal} bg-light rounded`}
                  >
                    {player.name}
                  </li>
                );
              })}
            </ul>
            {/* Start game */}
            {players.length ? (
              <Card className={`${margin.marginUpSmall} ${classes.center} p-0`}>
                <Href href={`${gameConstants.playUrl}?gameId=${gameId}`}>
                  Start game
                </Href>
              </Card>
            ) : null}
          </>
        ) : (
          <Sentence>Waiting for players to join...</Sentence>
        )}
      </Card>
    </>
  );
}
