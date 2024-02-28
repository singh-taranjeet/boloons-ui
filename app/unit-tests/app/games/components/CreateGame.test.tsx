import {
  screen,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { CreateGame } from "@/app/games/components/CreateGame";
import { logRoles } from "@testing-library/dom";
import { TestConstants } from "@/app/lib/constants.lib";

test("CreateGame Component", async () => {
  vi.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));

  render(<CreateGame />);

  const loader = screen.getByRole("alert", { name: "loading" });

  await waitForElementToBeRemoved(loader);

  expect(screen.getByText("Your gamer name"));

  const input = screen.getByRole("textbox", { name: "player name" });
  logRoles(input);
  expect(input.value).toBe(TestConstants.player.name);

  expect(screen.getByText("Share this url with your frieds to join"));

  expect(screen.getByRole("button", { name: "Copy Join url" }));
});
