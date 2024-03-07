import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  isMultiPlayer?: boolean;
  userScore: number;
  opponentScore?: number;
}

export const Confetti = (props: ConfettiProps) => {
  const { isMultiPlayer, userScore, opponentScore } = props;

  useEffect(() => {
    function lauchConfetti() {
      confetti({
        spread: 180,
        particleCount: 1000,
      });
    }

    if (isMultiPlayer && opponentScore !== undefined) {
      if (userScore > opponentScore) {
        lauchConfetti();
      }
    } else {
      if (userScore > 5) {
        lauchConfetti();
      }
    }
  }, [userScore, opponentScore, isMultiPlayer]);
  return null;
};
