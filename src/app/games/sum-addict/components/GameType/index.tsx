"use client";
import { Sentence } from "@/app/components/Sentence";
import { Href } from "@/app/components/Href";
import { Card } from "@/app/components/Card";
import { CreateGame } from "../../../components/CreateGame";
import Modal from "@/app/components/Modal";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/Button";
import { JoinGame } from "../../../components/JoinGame";
import { urls } from "@/app/lib/constants.lib";
import { gameConstants } from "@/app/games/lib/game.constants.lib";

export function GameType() {
  const pathName = usePathname();

  const isCreateMode = urls.pages.games.sumAddict.createUrl === pathName;
  const isJoinMode = urls.pages.games.sumAddict.joinUrl === pathName;

  const [isCreateGameModalOpen, setIsCreateGameModalOpen] =
    useState(isCreateMode);

  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(isJoinMode);

  function onJoinClick() {
    setIsJoinGameModalOpen(false);
  }

  useEffect(() => {
    setIsJoinGameModalOpen(isJoinMode);
  }, [isJoinMode]);

  useEffect(() => {
    setIsCreateGameModalOpen(isCreateMode);
  }, [isCreateMode]);

  return (
    <>
      <Card
        className={`flex flex-col justify-center gap-normal md:row md:justify-between mt-normal w-fit mx-auto`}
      >
        {isJoinMode ? (
          <Sentence>Waiting for the game to start...</Sentence>
        ) : (
          <>
            <Sentence fontSize="text-medium" className={`text-primary`}>
              How you want to play?
            </Sentence>
            <Href href={`${urls.pages.games.sumAddict.playUrl}`}>Solo</Href>
            <Button onClick={() => setIsCreateGameModalOpen(true)}>
              Play with friends
            </Button>
          </>
        )}
      </Card>

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
          open={isJoinGameModalOpen}
          onClose={() => setIsJoinGameModalOpen(false)}
        >
          <JoinGame onClickJoin={onJoinClick} />
        </Modal>
      ) : null}
    </>
  );
}
