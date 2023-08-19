function getRandomInt(max: number = 100000000): number {
  return Math.floor(Math.random() * max);
}

beforeEach(() => {
  //cy.viewport("iphone-xr");
  cy.visit("http://localhost:3000");
});

describe("Test Home page", () => {
  it("Tests the home page", () => {
    cy.get("h1").contains("Boloons");
    cy.get("img[alt='space-craft image']");
    cy.get("img[alt='sum addiction logo']");
    cy.get("a").contains("Play Sum addiction");
  });
});

describe("Test Sum-addiction page", () => {
  beforeEach(() => {
    // Redirect to play game
    cy.get("a").contains("Play Sum addiction").filter(":visible").click();
  });
  it("Redirects", () => {
    cy.url().should("include", "/games/sum-addict");
  });

  describe("Has all elements on the Sum-Addiction page", () => {
    it("Has the button group", () => {
      cy.get("a").contains("Solo");
      cy.get("button").contains("With friends");
      cy.contains("How you want to play?");
    });
    it("Has the sum addict heading", () => {
      cy.get("h1").contains("Sum Addict");
    });
  });

  describe("Has question and options", () => {
    it("Has a question", () => {
      cy.get(`[aria-label='question']`).contains(15);
    });
    it("Has options from 1 to 9", () => {
      for (let i = 1; i < 10; i++) {
        cy.get(`[aria-label='option']`).contains(i);
      }
    });
  });

  describe("Test Solo game", () => {
    beforeEach(() => {
      // Redirect to play game
      cy.get("a").contains("Solo").click();
      cy.wait(3000);
    });
    it("Redirected to correct url", () => {
      cy.url().should("include", "games/sum-addict/play");
    });
    it("Shows the starting modal", () => {
      cy.contains("Starting game");
    });
    it("Score is 5 when correct answers are typed", () => {
      cy.wait(3000);
      cy.get(`[aria-label="question"]`).then(($value) => {
        const question = Number($value.text());
        const attemps: number[] = [];
        let answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
        let ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
        while (ansSum !== Number(question)) {
          answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
          ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
        }

        answers.forEach((answer) => {
          cy.get(`[aria-label='option']`).contains(answer).click();
        });

        cy.get(`[aria-label="score"]`).contains(5);
      });
    });
  });
});
