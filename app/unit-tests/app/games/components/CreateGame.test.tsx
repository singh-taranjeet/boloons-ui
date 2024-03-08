import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { CreateGame } from "@/app/games/components/CreateGame";
import { urls } from "@/app/lib/constants.lib";
import { gameConstants } from "@/app/games/lib/game.constants.lib";

test("CreateGame Component", async () => {
  vi.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));

  render(
    <CreateGame
      gameType={gameConstants.games.SumAddict}
      gamePlayUrl={urls.pages.games.sumAddict.playUrl}
      gameJoinUrl={urls.pages.games.sumAddict.joinUrl}
    />
  );

  const loader = screen.getByRole("alert", { name: "loading" });

  await waitForElementToBeRemoved(loader);

  expect(screen.getByText(/Your gamer name:/i));

  expect(screen.getByText("Share this url with your frieds to join"));

  expect(screen.getByText("Copy Join url"));
});
