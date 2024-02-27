import { Button } from "@/app/components/Button";
import { flexCenter } from "@/app/lib/style.lib";
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
    <div className={`mt-large ${flexCenter}`}>
      <Button onClick={onClick} className="w-fit mx-auto">
        Restart
      </Button>
    </div>
  );
}
