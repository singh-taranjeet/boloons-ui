"use client";
import { FontSizeType } from "@/app/lib/constants";
import { gameConstants } from "../lib/constants";
import { useCallback, useEffect, useState } from "react";
import { getRandomInt } from "@/app/lib/server-helper";
import { usePlayer, useWebSocket } from "@/app/lib/cutom-hooks";
import { Card } from "../../components/Card";
import { TextInput } from "../../components/TextInput";
import { Sentence } from "@/app/games/components/Sentence";
import Icon from "../../components/Icon";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { flexCenter } from "@/app/lib/style.lib";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";

export default function Page() {
  const fakeName = getRandomInt();
  const [gameId, setGameId] = useState("");
  const [gameName, setGameName] = useState(`${fakeName}`);
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [joinUrl, setJoinUrl] = useState("");
  const { player } = usePlayer();
  const { socket } = useWebSocket();
  const router = useRouter();

  // Event on player Join
  const onPlayerJoin = useCallback(function onPlayerJoin(res: any) {
    // console.log("player joined");
    if (
      res.type === gameConstants.multiPlayer.eventMessageType.playerJoinedMsg
    ) {
      setPlayers(res.players);
    }
  }, []);

  // When GameId changes subscribe to the game session
  useEffect(() => {
    // Create Listener for players joining
    if (gameId) {
      // console.log("subscribed on gameid", gameId);
      socket.on(`${gameId}`, onPlayerJoin);
    }
    return () => {
      socket.off(`${gameId}`, onPlayerJoin);
    };
  }, [gameId, onPlayerJoin, socket]);

  function createGameSession() {
    const id = `${getRandomInt()}`;
    setJoinUrl(`${window.location.origin}${gameConstants.joinUrl}?id=${id}`);
    setGameId(id);
    const session = {
      gameId: id,
      name: gameName,
    };
    socket.emit(gameConstants.multiPlayer.events.createSesion, session);
  }

  function startGame() {
    socket.emit(gameConstants.multiPlayer.events.gameStarted, {
      gameId,
    });
    socket.emit(gameConstants.multiPlayer.events.playerJoined, {
      gameId,
      name: player?.name,
      playerId: player?.id,
    });
    // console.log("starting game");
    router.push(`${gameConstants.playUrl}?gameId=${gameId}`);
  }

  // console.log("Players", players);

  return (
    <>
      <Card className={`${flexCenter} mt-large`}>
        <Sentence className="font-medium">
          Create a new {gameConstants.name} game
        </Sentence>

        {/* Game Name */}
        <section className={`mt-normal ${flexCenter} w-full gap-small`}>
          <label
            className={`${FontSizeType.normal} ${flexCenter} whitespace-nowrap text-primary`}
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
        {gameId ? (
          <section className={`${flexCenter} mt-large`}>
            <Sentence>Share this url with players to join</Sentence>
            <div
              className={`mt-large gap-normal flex justify-between cursor-pointer bg-light p-rectangle-normal rounded`}
              onClick={() => navigator.clipboard.writeText(joinUrl)}
            >
              <Sentence className={`${flexCenter} whitespace-nowrap`}>
                {"Copy Join url"}
              </Sentence>
              <Icon icon={faClone} />
            </div>
          </section>
        ) : null}

        {/* Create Game button */}
        {!gameId ? <Button onClick={createGameSession}>Create</Button> : null}
      </Card>

      {/* Players who have joined */}
      <Card className={`mt-normal`}>
        {players.length ? (
          <>
            <Sentence>Players who have joined</Sentence>

            <ul>
              {players.map((player) => {
                return (
                  <li
                    key={player.id}
                    className={`${FontSizeType.normal} text-primary mt-normal p-rectangle-normal bg-light rounded`}
                  >
                    {player.name}
                  </li>
                );
              })}
            </ul>
            {/* Start game */}
            {players.length ? (
              <Card className={`mt-normal ${flexCenter} p-0`}>
                <Button onClick={startGame}>Start game</Button>
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
