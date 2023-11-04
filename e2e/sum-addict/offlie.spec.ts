// Write test to check offline mode
import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByLabel("Play sum addiction").click();
  await page.getByRole("link", { name: "Solo" }).click();
  await page.getByText("9").click();
  await page.getByText("6").click();
  await page
    .locator("div")
    .filter({ hasText: /^55$/ })
    .getByRole("paragraph")
    .click();
  await page.getByText("8").nth(2).click();
  await page.getByText("8").nth(1).click();
  await page.getByText("9").click();
  await page.getByText("8").click();
  await page.getByText("6").nth(3).click();
  await page.getByText("6").nth(2).click();
  await page.getByText("8").click();
  await page
    .locator("div")
    .filter({ hasText: "Score30Play again" })
    .first()
    .click();
});
