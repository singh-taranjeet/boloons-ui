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
    await page.getByRole("link", { name: "Solo" }).click();
    //Verify that desired text is visible
    //await expect(page.getByText("Starting game")).toBeVisible();
    const question = await page.getByLabel("question").innerText();
    console.log("Question = ", question);
    // Create random set of answers
    let answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
    let ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
    //check if answers have unique values
    const uniqueAnswers = new Set(answers);

    while (
      ansSum !== Number(question) &&
      uniqueAnswers.size === answers.length
    ) {
      answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
      ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
    }

    console.log("Random set of answers", answers);

    // Loop the ansers array and click on that button

    // check the score is incremented by 5
  });
});
