import { test } from "@playwright/test";

test("Landing page: Game", async ({ page }) => {
  await page.goto("https://www.boloons.com/games");

  await page.getByRole("heading", { name: "Games", exact: true });
  await page.getByRole("heading", { name: "Play games to train your brain" });
  await page.getByRole("link", { name: "Play Sum Addict" });
  await page.getByRole("link", { name: "Play Shapr" });
  await page.getByRole("img", { name: "Sum Addict" });
  await page.getByRole("img", { name: "Sharp" });
  await page.getByRole("img", { name: "game-controller" });
});
