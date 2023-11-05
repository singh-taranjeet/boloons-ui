import { expect } from "@playwright/test";
import { test } from "@playwright/test";

function getRandomInt(max: number = 100000000): number {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
  return a[Math.floor(Math.random() * max)];
}

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
    await expect(page.getByRole("link", { name: "Back" })).toBeVisible();
    await page.getByRole("link", { name: "Back" }).click();
    //verify that current Url is previous URL
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("verify solo page", async ({ page }) => {
    await page.getByLabel("Play sum addiction").click();

    // Click on the solo play button
    await page.getByRole("link", { name: "Solo" }).click();

    // Wait for game count down timer
    await page.waitForTimeout(4500);
    //Verify that desired text is visible
    //await expect(page.getByText("Starting game")).toBeVisible();

    // test if page is redirected to play page
    await expect(page).toHaveURL(/games\/sum-addict\/play/);

    // test if questin is visible
    await expect(page.getByLabel("question")).toBeVisible();
    const question = await page.getByLabel("question").innerText();

    // test if score is visible
    await expect(page.getByLabel("score")).toBeVisible();
    let score = await page.getByLabel("score").innerText();

    // Create random set of answers
    let answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
    let ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
    while (ansSum !== Number(question)) {
      answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
      ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
    }

    // Loop the ansers array and click on that button
    for (const answer of answers) {
      await page.locator(`[aria-label="option"] >> text="${answer}"`).click();
    }
    // check the score is incremented by 5
    score = await page.getByLabel("Score").innerText();
    expect(score).toBe("5");
  });
});
