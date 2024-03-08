import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.boloons.com/games/sharp");
});

test("Sharp: Landing Page", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await page.getByRole("img", { name: "Sharp" });
  await page.getByRole("heading", { name: "Sharp" });
  await page.getByText("Select if the equation is correct or incorrect");
  await page.getByText("How you want to play?");
  await page.getByRole("link", { name: "Solo" });
  await page.getByRole("link", { name: "With friends" });
  await page.getByLabel("question");
  await page.getByRole("button", { name: "With friends" }).click();
  await page.getByText("Play with friends");
  await page.getByText(/Your gamer name:/i);
  await page.getByText(/You can change gammer name/i);
  await page.getByText(/Share this url with your/i);
});
