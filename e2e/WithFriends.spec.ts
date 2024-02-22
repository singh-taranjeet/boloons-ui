import { test, expect } from "@playwright/test";

test.describe("Home URL", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByLabel("Play sum addiction").click();
  });

  test("with friends button ", async ({ page }) => {
    //Verify that with friends button is  visible
    await expect(
      page.getByRole("button", { name: "With friends" })
    ).toBeVisible();
    // Click on the with friends button
    await page.getByRole("button", { name: "With friends" }).click();
    // Click on cross button
    await page.locator("svg").click();
    // Verify the url
    await expect(page).toHaveURL(/games\/sum-addict\/with-friends/);
  });
});
