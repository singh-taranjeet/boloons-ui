import { test, expect } from "@playwright/test";

test("Landing page", async ({ page }) => {
  await page.goto("https://www.boloons.com/");

  await page.getByRole("heading", { name: "Boloons" }).click();
  await page.getByRole("heading", { name: "Train your brain" }).click();
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("link", { name: "Games" });
  await page.getByRole("link", { name: "Boloons" });
  await page.getByRole("link", { name: "Settings" });
  await expect(page).toHaveURL(/games/i);
});
