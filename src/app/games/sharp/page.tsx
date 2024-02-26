import { AppConstants } from "@/app/lib/constants.lib";
import { GamePage } from "../components/GamePage";

// To render the sum addict game and its components
export default function Page() {
  return (
    <GamePage
      description={AppConstants.pages.sharp.description}
      title={AppConstants.pages.sharp.title}
      imgSrc={"/media/sharp-logo.png"}
    >
      dsf
    </GamePage>
  );
}
