const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
function getRandomInt(max: number = 100000000): number {
  return a[Math.floor(Math.random() * max)];
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
    });
    it("Redirected to correct url", () => {
      cy.url().should("include", "games/sum-addict/play");
    });
    it("Shows the starting modal", () => {
      cy.contains("Starting game");
    });
    it("Score correctly displayed as per attempts", () => {
      cy.wait(5000);
      cy.get(`[aria-label="question"]`).then(($value) => {
        const question = Number($value.text());
        const attemps: number[] = [];
        let answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
        let ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);

        while (ansSum !== Number(question)) {
          answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
          ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
        }

        /**
         * Right Attempt
         */
        answers.forEach((answer) => {
          cy.get(`[aria-label='option']`).contains(answer).click();
        });

        cy.wait(1000);
        cy.get(`[aria-label="score"]`).contains(5);

        /**
         * RIght Attempt
         */
        cy.get(`[aria-label="question"]`).then(($v) => {
          const quest = $v.text();
          let answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
          let ansSum = answers.reduce(
            (item, currentSum) => item + currentSum,
            0
          );
          // Correct Attemp -> 10
          while (ansSum !== Number(quest)) {
            answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
            ansSum = answers.reduce((item, currentSum) => item + currentSum, 0);
          }

          answers.forEach((answer) => {
            cy.get(`[aria-label='option']`).contains(answer).click();
          });
          cy.wait(1000);
          cy.get(`[aria-label="score"]`).contains(10);
        });

        /**
         * Wrong Attempt
         */
        cy.get(`[aria-label="question"]`).then(($v) => {
          const question = $v.text();
          const answers = [getRandomInt(9), getRandomInt(9), getRandomInt(9)];
          const ansSum = answers.reduce(
            (item, currentSum) => item + currentSum,
            0
          );
          // Wrong Attemp -> 5
          if (ansSum !== Number(question)) {
            answers.forEach((answer) => {
              cy.get(`[aria-label='option']`).contains(answer).click();
            });
          }
          cy.wait(1000);
          cy.get(`[aria-label="score"]`).contains(10);
        });
      });
    });
  });
});
