import { test, expect, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.boloons.com/games/sum-addict");
});

test("Sum Addict: Landing Page", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await page.getByRole("img", { name: "Sum Addict" });
  await page.getByRole("heading", { name: "Sum Addict" });
  await page.getByText("Select upto 3 number which");
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

test("Sum Addict: Solo Game : Score increments on correct attempt", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Solo" }).click();
  await expect(page).toHaveURL("https://www.boloons.com/games/sum-addict/play");
  await page.getByText("Starting game", { exact: true });

  await page.waitForTimeout(4000);

  await page.getByRole("img", { name: "Audio is mute" });

  await page.getByRole("img", { name: "Score icon" }).click();

  await page.getByRole("img", { name: "Timer icon" }).click();
  await page.getByLabel("question");
  await expect(page.getByLabel("score")).toBeVisible();
  const initialScore = await getScore(page);
  expect(initialScore).toBe(0);
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
});

test("Sum Addict: Solo Game : Score does not increment on incorrect attempt", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Solo" }).click();
  await expect(page).toHaveURL("https://www.boloons.com/games/sum-addict/play");
  await page.getByText("Starting game", { exact: true });

  await page.waitForTimeout(4000);

  await page.getByRole("img", { name: "Audio is mute" });

  await page.getByRole("img", { name: "Score icon" }).click();

  await page.getByRole("img", { name: "Timer icon" }).click();
  await page.getByLabel("question");
  await expect(page.getByLabel("score")).toBeVisible();
  const initialScore = await getScore(page);
  expect(initialScore).toBe(0);

  // Create random set of answers
  let answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
  let ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
  let question = await getQuestion(page);

  while (ansSum === question) {
    answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
    ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
  }

  // Loop the ansers array and click on that button
  for (const answer of answers) {
    await clickAnswer(page, answer);
  }
  // check the score is incremented by 5
  let score = await getScore(page);
  expect(score).toBe(0);
});
