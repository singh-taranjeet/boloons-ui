import { ScoreCard } from "@/app/games/components/ScoreCard";
import { render, screen } from "@testing-library/react";
// import roleLog from testing library

import { test, expect, describe } from "vitest";

describe("Multiplayer Score Card Component", () => {
  test("ScoreCard", () => {
    const opponent = { score: 9, name: "example" };

    render(<ScoreCard score={6} opponent={opponent} isMultiPlayer={true} />);

    // check if user score value is dipalyed
    expect(screen.getByText(/6/i));

    // Check if score value is displayed
    expect(screen.getByText(/9/i));

    // check if opponent avatar is displayed
    expect(screen.getByRole("img", { name: /example/i }));

    // check if user avatar is displayed
    expect(screen.getByRole("img", { name: /test-name/i }));

    expect(screen.getByText("example"));
  });
});
