import { screen, render } from "@testing-library/react";
import { Card } from "@/app/components/Card";
import { describe, test, expect } from "vitest";

describe("Card Component", () => {
  test("renders a dark card", () => {
    render(<Card variant="dark">Dark Click me</Card>);
    const card = screen.getByText("Dark Click me");
    expect(card.classList).toContain("bg-light");
  });

  test("renders a light card", () => {
    render(<Card variant="light">Light Click me</Card>);
    const card = screen.getByText("Light Click me");

    expect(card.classList).toContain("bg-white");
  });
});
