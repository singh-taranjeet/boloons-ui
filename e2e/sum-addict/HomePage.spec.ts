import { expect, test } from "@playwright/test";

test.describe("Home URL", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
  });

  test("verify home page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Boloons" })).toBeVisible();
    await expect(page.getByLabel("Play sum addiction")).toBeVisible();
    await page.getByLabel("Play sum addiction").click();
    await expect(page).toHaveURL(/games\/sum-addict/);
  });

  test("verify back button", async ({ page }) => {
    await expect(page.getByLabel("Play sum addiction")).toBeVisible();
    await page.getByLabel("Play sum addiction").click();
    await expect(page.getByRole("link", { name: "Back" })).toBeVisible();
    await page.getByRole("link", { name: "Back" }).click();
    //verify that current Url is previous URL
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
