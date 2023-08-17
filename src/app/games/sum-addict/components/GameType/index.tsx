"use client";
import { Sentence } from "@/app/components/Sentence";
import { Href } from "@/app/components/Href";
import { Card } from "@/app/components/Card";
import { CreateGame } from "../../../components/CreateGame";
import Modal from "@/app/components/Modal";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/Button";
import { JoinGame } from "../../../components/JoinGame";
import { urls } from "@/app/lib/constants.lib";
import { useHttp, usePlayer, useWebSocket } from "@/app/lib/cutom-hooks.lib";
import { gameConstants } from "@/app/games/lib/game.constants.lib";

export function GameType() {
  const pathName = usePathname();

  const isCreateMode = urls.pages.games.sumAddict.createUrl === pathName;
  const isJoinMode = urls.pages.games.sumAddict.joinUrl === pathName;

  const params = useSearchParams();
  const { socket } = useWebSocket();
  const { player, updatePlayerName } = usePlayer();
  const gameId = params?.get("id");
  const [joined, setJoined] = useState(false);
  const router = useRouter();

  function onClickJoin() {
    setJoined(true);
    setIsJoinGameModalOpen(false);
    socket.emit(gameConstants.multiPlayer.events.playerJoined, {
      gameId,
      name: player?.name,
      playerId: player?.id,
    });
  }

  const onGameStart = useCallback(
    function onGameStart(res: { type: string }) {
      if (
        res.type === gameConstants.multiPlayer.eventMessageType.gameStartedMsg
      ) {
        router.push(`${urls.pages.games.sumAddict.playUrl}?gameId=${gameId}`);
      }
    },
    [gameId, router]
  );

  useEffect(() => {
    socket.on(`${gameId}`, onGameStart);
    return () => {
      socket.off(`${gameId}`, onGameStart);
    };
  }, [gameId, onGameStart, socket]);

  const [isCreateGameModalOpen, setIsCreateGameModalOpen] =
    useState(isCreateMode);

  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(isJoinMode);

  useEffect(() => {
    setIsJoinGameModalOpen(isJoinMode);
  }, [isJoinMode]);

  useEffect(() => {
    setIsCreateGameModalOpen(isCreateMode);
  }, [isCreateMode]);

  console.log("isJoinGameModalOpen", isJoinGameModalOpen);

  return (
    <>
      <div
        className={`flex-center gap-normal md:row md:justify-between w-full mx-auto`}
      >
        {joined ? (
          <Sentence className="text-center">
            Waiting for the game to start
          </Sentence>
        ) : (
          <>
            <Sentence
              fontSize="text-medium"
              className={`text-primary mb-small text-center`}
            >
              How you want to play?
            </Sentence>
            <div className="flex justify-between gap-small mt-small md:mt-normal">
              <Href
                className="flex-1 w-1/2"
                href={`${urls.pages.games.sumAddict.playUrl}`}
              >
                Solo
              </Href>
              <Button
                className="flex-1 w-1/2"
                onClick={() => setIsCreateGameModalOpen(true)}
              >
                With friends
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Create Game Modal */}
      {isCreateGameModalOpen ? (
        <Modal
          title="Play with friends"
          open={isCreateGameModalOpen}
          onClose={() => setIsCreateGameModalOpen(false)}
        >
          <CreateGame />
        </Modal>
      ) : null}

      {/* Join Game Modal */}
      {isJoinGameModalOpen ? (
        <Modal
          title="Join?"
          open={isJoinGameModalOpen}
          onClose={() => setIsJoinGameModalOpen(false)}
        >
          <JoinGame onClickJoin={onClickJoin} />
        </Modal>
      ) : null}
    </>
  );
}
