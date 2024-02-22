import { Page, expect, test } from "@playwright/test";

function getRandomInt(max: number = 100000000): number {
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
  return a[Math.floor(Math.random() * max)];
}

async function getQuestion(page: Page) {
  const question = await page.getByLabel("question").innerText();
  return Number(question);
}

async function getScore(page: Page) {
  const score = await page.getByLabel("score").innerText();
  return Number(score);
}
async function clickAnswer(page: Page, answer: number) {
  await page.locator(`[aria-label="option"] >> text="${answer}"`).click();
}

async function clikSoloButton(page: Page) {
  await page.getByRole("link", { name: "Solo" }).click();
}

test.describe("Home URL", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByLabel("Play sum addiction").click();
  });

  test("verify solo page", async ({ page }) => {
    await page.getByLabel("Play sum addiction").click();

    // Click on the solo play button
    await clikSoloButton(page);

    // Wait for game count down timer
    await page.waitForTimeout(4500);
    //Verify that desired text is visible
    //await expect(page.getByText("Starting game")).toBeVisible();

    // test if page is redirected to play page
    await expect(page).toHaveURL(/games\/sum-addict\/play/);

    // test if questin is visible

    // test if score is visible
    await expect(page.getByLabel("score")).toBeVisible();

    // Create random set of answers
    let answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
    let ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
    let question = await getQuestion(page);
    while (ansSum !== question) {
      answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
      ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
    }

    // Loop the ansers array and click on that button
    for (const answer of answers) {
      await clickAnswer(page, answer);
    }
    // check the score is incremented by 5
    let score = await getScore(page);
    expect(score).toBe(5);

    //check value of question
    question = await getQuestion(page);
    if (Number(question) >= 9) {
      let randomNumber = getRandomInt(9);
      while (randomNumber !== Number(question)) {
        randomNumber = getRandomInt(9);
      }
      await page
        .locator(`[aria-label="option"] >> text="${randomNumber}"`)
        .click();
      score = await getScore(page);
      expect(score).toBe(10);
    } else if (Number(question) > 9 && Number(question) <= 18) {
      let randomNumbers = [getRandomInt(9), getRandomInt(9)];
      let sum = getRandomInt(9) + getRandomInt(9);
      while (sum !== Number(question)) {
        randomNumbers = [getRandomInt(9), getRandomInt(9)];
        sum = getRandomInt(9) + getRandomInt(9);
      }
      for (const randomNumber of randomNumbers) {
        await page
          .locator(`[aria-label="option"] >> text="${randomNumber}"`)
          .click();
      }
      score = await getScore(page);
      expect(score).toBe(15);
    }
  });

  test("time should be of 30 seconds", async ({ page }) => {
    await clikSoloButton(page);
    await page.getByLabel("time").innerText();
    await page.waitForTimeout(30000);

    await expect(page.getByRole("link", { name: "Play again" })).toBeVisible();
  });
});
