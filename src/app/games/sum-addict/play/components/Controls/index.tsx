import { Button } from "@/app/games/components/Button";

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
    <div className={`m-top-large flex-center`}>
      <Button onClick={onClick} className="w-fit mx-auto">
        Restart
      </Button>
    </div>
  );
}
