"use client";
import { Sentence } from "@/app/components/Sentence";
import { Href } from "@/app/components/Href";
import { CreateGame } from "../../components/CreateGame";
import { Modal } from "@/app/components/Modal";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/app/components/Button";
import { JoinGame } from "../../components/JoinGame";
import { urls } from "@/app/lib/constants.lib";
import { useWebSocket } from "@/app/lib/cutom-hooks.lib";
import { usePlayer } from "@/app/lib/player-hook.lib";
import { gameConstants } from "@/app/games/lib/game.constants.lib";
import { joinGame } from "@/app/games/lib/game.methods.lib";

interface GameTypeProps {
  gameSoloUrl: string;
  gameMultiplayerUrl: string;
}
export function GameType(props: GameTypeProps) {
  const { gameMultiplayerUrl, gameSoloUrl } = props;

  const pathName = usePathname();

  const isCreateMode = urls.pages.games.sumAddict.createUrl === pathName;
  const isJoinMode = urls.pages.games.sumAddict.joinUrl === pathName;

  const params = useSearchParams();
  const { socket } = useWebSocket();
  const { player } = usePlayer();
  const gameId = params?.get("id");
  const [joined, setJoined] = useState(false);
  const router = useRouter();

  async function onClickJoin() {
    setJoined(true);
    setIsJoinGameModalOpen(false);

    if (player.id && player.name && gameId) {
      const response = await joinGame({
        playerId: player.id,
        gameId,
        name: player.name,
      });
    }
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
            <Sentence fontSize="text-medium" className={`mb-small text-center`}>
              How you want to play?
            </Sentence>
            <div className="flex justify-between gap-small mt-small md:mt-normal">
              <Href
                className="flex-1 w-1/2"
                href={gameSoloUrl}
                bgColor="bg-white"
                color="text-primary"
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
        <Modal.ModalDialog
          open={isCreateGameModalOpen}
          onClose={() => setIsCreateGameModalOpen(false)}
        >
          <Modal.ModalBody>
            <Modal.ModalTitle>Play with friends</Modal.ModalTitle>
            <Modal.ModalCloseIcon
              onClose={() => setIsCreateGameModalOpen(false)}
            />
            <Modal.ModalContent>
              <CreateGame gameUrl={gameMultiplayerUrl} />
            </Modal.ModalContent>
          </Modal.ModalBody>
        </Modal.ModalDialog>
      ) : null}

      {/* Join Game Modal */}
      {isJoinGameModalOpen ? (
        <Modal.ModalDialog
          open={isJoinGameModalOpen}
          onClose={() => setIsJoinGameModalOpen(false)}
        >
          <Modal.ModalBody>
            <div className="min-w-full">
              <Modal.ModalTitle>Join?</Modal.ModalTitle>
            </div>
            <Modal.ModalContent>
              <JoinGame onClickJoin={onClickJoin} />
            </Modal.ModalContent>
          </Modal.ModalBody>
        </Modal.ModalDialog>
      ) : null}
    </>
  );
}
