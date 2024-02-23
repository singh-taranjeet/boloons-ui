"use client";
import { useCallback, useEffect, useState } from "react";
import { useWebSocket } from "@/app/lib/cutom-hooks.lib";
import { Card } from "../../../components/Card";
import { Sentence } from "@/app/components/Sentence";
import Icon from "../../../components/Icon";
import { faClone } from "@fortawesome/free-regular-svg-icons";
import { StyleConstants, flexCenter } from "@/app/lib/style.lib";
import { Button } from "../../../components/Button";
import { useRouter } from "next/navigation";
import { gameConstants } from "../../lib/game.constants.lib";
import { urls } from "@/app/lib/constants.lib";
import { TextInput } from "@/app/components/TextInput";
import { apiRequest } from "@/app/lib/server.lib";
import { joinGame } from "../../lib/game.methods.lib";
import { PulseLoading } from "@/app/components/PulseLoading";
import { usePlayer } from "@/app/lib/player-hook.lib";

export function CreateGame() {
  const [gameId, setGameId] = useState("");
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [joinUrl, setJoinUrl] = useState("");
  const [urlCopied, setUrlCopied] = useState(false);
  const { player, updatePlayerName } = usePlayer();
  const [creatingGame, setCreatingGame] = useState(true);
  const { socket } = useWebSocket();
  const router = useRouter();

  // Event on player Join
  const onPlayerJoin = useCallback(function onPlayerJoin(res: any) {
    if (
      res.type === gameConstants.multiPlayer.eventMessageType.playerJoinedMsg &&
      res?.payload?.length
    ) {
      setPlayers(res.payload);
    }
  }, []);

  // When GameId changes subscribe to the game session
  useEffect(() => {
    // Create Listener for players joining
    if (gameId) {
      socket.on(`${gameId}`, onPlayerJoin);
    }
    return () => {
      socket.off(`${gameId}`, onPlayerJoin);
    };
  }, [gameId, onPlayerJoin, socket]);

  // Create join url when game id is avalable
  useEffect(() => {
    setJoinUrl(
      `${window.location.origin}${urls.pages.games.sumAddict.joinUrl}?id=${gameId}`
    );
  }, [gameId]);

  async function startGame() {
    await joinGame({
      playerId: player.id,
      gameId,
      name: player.name,
    });

    socket.emit(gameConstants.multiPlayer.events.gameStarted, {
      gameId,
    });

    console.log("starting game");
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
    async function fetchGameId() {
      const response = await apiRequest<
        { type: string; family: string },
        string
      >({
        url: `${urls.api.getGame}`,
        body: {
          type: "MultiPlayer",
          family: "SumAddict",
        },
        method: "post",
      });
      console.log("response", response);
      if (response.success && response.data) {
        setGameId(response.data);
      }
      setCreatingGame(false);
    }
    fetchGameId();
  }, []);

  return (
    <>
      <section className={`${flexCenter}`}>
        {creatingGame ? (
          <>
            <PulseLoading />
          </>
        ) : null}
        {/* Share the game session url */}
        {gameId ? (
          <section className={`${flexCenter} mt-small md:mt-0`}>
            <Sentence>Your gamer name</Sentence>
            <TextInput
              aria-label="player name"
              className="mt-small md-mt-normal"
              placeholder="Enter your gamer name"
              value={player?.name}
              onChange={(e) => updatePlayerName(e.target.value)}
            />
            <Sentence className="mt-normal">
              Share this url with your frieds to join
            </Sentence>
            <button
              className={`mt-small md-mt-normal gap-normal flex justify-between cursor-pointer bg-white p-rectangle-small rounded border-primary border-2`}
              onClick={onClickUrlCopy}
            >
              <Sentence
                className={`${flexCenter} whitespace-nowrap text-primary`}
              >
                {"Copy Join url"}
              </Sentence>

              <Icon icon={faClone} />
            </button>
          </section>
        ) : null}
      </section>

      {/* Players who have joined */}
      {joinUrl && urlCopied ? (
        <>
          {players.length ? (
            <section className={`mt-normal`}>
              <Sentence>Players who have joined</Sentence>

              <ul>
                {players.map((plyr) => {
                  return (
                    <li
                      key={plyr.id}
                      className={`${
                        StyleConstants.FontSize["text-medium"]
                      } text-primary mt-normal p-rectangle-normal bg-light rounded ${
                        plyr.id == player?.id ? "hidden" : ""
                      }`}
                    >
                      {plyr.name}
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
            </section>
          ) : (
            <Sentence className="mt-normal">
              Waiting for players to join...
            </Sentence>
          )}
        </>
      ) : null}
    </>
  );
}
