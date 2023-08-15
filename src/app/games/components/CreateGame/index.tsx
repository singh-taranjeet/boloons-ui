"use client";
import { useCallback, useEffect, useState } from "react";
import { getRandomInt } from "@/app/lib/server.lib";
import { usePlayer, useWebSocket } from "@/app/lib/cutom-hooks.lib";
import { Card } from "../../../components/Card";
import { Sentence } from "@/app/components/Sentence";
import Icon from "../../../components/Icon";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { StyleConstants, flexCenter } from "@/app/lib/style.lib";
import { Button } from "../../../components/Button";
import { useRouter } from "next/navigation";
import { gameConstants } from "../../lib/game.constants.lib";
import { urls } from "@/app/lib/constants.lib";

export function CreateGame() {
  // const fakeName = getRandomInt();
  const [gameId, setGameId] = useState("");
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [joinUrl, setJoinUrl] = useState("");
  const [urlCopied, setUrlCopied] = useState(false);
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

  const createGameSession = useCallback(
    function createGameSession() {
      const id = `${getRandomInt()}`;
      setJoinUrl(
        `${window.location.origin}${urls.pages.games.sumAddict.joinUrl}?id=${id}`
      );
      setGameId(id);
      const session = {
        gameId: id,
      };
      socket.emit(gameConstants.multiPlayer.events.createSesion, session);
    },
    [socket]
  );

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
    router.push(`${urls.pages.games.sumAddict.playUrl}?gameId=${gameId}`);
  }

  function onClickUrlCopy() {
    setTimeout(() => {
      setUrlCopied(true);
    }, 3000);
    navigator.clipboard.writeText(joinUrl);
  }

  // on load create a game session
  useEffect(() => {
    createGameSession();
  }, [createGameSession]);

  return (
    <>
      <section className={`${flexCenter}`}>
        {/* Share the game session url */}
        {gameId ? (
          <section className={`${flexCenter} mt-small md:mt-0`}>
            <Sentence>Share this url with your frieds to join</Sentence>
            <div
              className={`mt-normal gap-normal flex justify-between cursor-pointer bg-primary p-rectangle-normal rounded`}
              onClick={onClickUrlCopy}
            >
              <Sentence
                className={`${flexCenter} whitespace-nowrap text-white`}
              >
                {"Copy Join url"}
              </Sentence>

              <Icon color="text-white" icon={faClone} />
            </div>
          </section>
        ) : null}
      </section>

      {/* Players who have joined */}
      {joinUrl && urlCopied ? (
        <section className={`mt-normal`}>
          {players.length ? (
            <>
              <Sentence>Players who have joined</Sentence>

              <ul>
                {players.map((player) => {
                  return (
                    <li
                      key={player.id}
                      className={`${StyleConstants.FontSize["text-medium"]} text-primary mt-normal p-rectangle-normal bg-light rounded`}
                    >
                      {player.name}
                    </li>
                  );
                })}
              </ul>
              {/* Start game */}
              {players.length ? (
                <Card className={`${flexCenter} p-0`}>
                  <Button className="w-fit self-center" onClick={startGame}>
                    Start
                  </Button>
                </Card>
              ) : null}
            </>
          ) : (
            <Sentence>Waiting for players to join...</Sentence>
          )}
        </section>
      ) : null}
    </>
  );
}
