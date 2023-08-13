"use client";
import { gameConstants } from "../../lib/constants";
import { Sentence } from "@/app/games/components/Sentence";
import { Href } from "@/app/games/components/Href";
import { Card } from "@/app/games/components/Card";
import { CreateGame } from "../CreateGame";
import Modal from "@/app/games/components/Modal";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/app/games/components/Button";
import { JoinGame } from "../JoinGame";

export function GameType() {
  const pathName = usePathname();

  const isCreateMode = gameConstants.createUrl === pathName;
  const isJoinMode = gameConstants.joinUrl === pathName;

  const [isCreateGameModalOpen, setIsCreateGameModalOpen] =
    useState(isCreateMode);

  const [isJoinGameModalOpen, setIsJoinGameModalOpen] = useState(isJoinMode);

  return (
    <Card
      className={`flex flex-col justify-center gap-normal md:row md:justify-between mt-normal w-fit mx-auto`}
    >
      <Sentence size="normal" className={`text-primary`}>
        How you want to play?
      </Sentence>
      <Href href={`${gameConstants.playUrl}`}>Solo</Href>
      <Button onClick={() => setIsCreateGameModalOpen(true)}>
        Play with friends
      </Button>

      {/* Create Game Modal */}
      <Modal
        title="Play with friends"
        open={isCreateGameModalOpen}
        onClose={() => setIsCreateGameModalOpen(false)}
      >
        <CreateGame />
      </Modal>

      {/* Join Game Modal */}
      <Modal
        open={isJoinGameModalOpen}
        onClose={() => setIsJoinGameModalOpen(false)}
      >
        <JoinGame />
      </Modal>
    </Card>
  );
}
