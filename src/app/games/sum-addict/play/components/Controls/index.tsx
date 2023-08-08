import { Button } from "@/app/games/components/Button";
import { classes, margin } from "@/app/lib/constants";

export function Controls(props: {
  onClick(): void;
  gameInProgress: boolean;
  className?: string;
}) {
  const { onClick, gameInProgress, className = "" } = props;
  if (gameInProgress) {
    return null;
  }

  return (
    <div className={`${margin.marginUp} ${classes.center}`}>
      <Button onClick={onClick} className="w-fit mx-auto">
        Restart
      </Button>
    </div>
  );
}
