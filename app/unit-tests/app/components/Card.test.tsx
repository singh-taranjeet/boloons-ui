import { screen, render } from "@testing-library/react";
import { Card } from "@/app/components/Card";
import { describe, test, expect } from "vitest";

describe("Card Component", () => {
  test("renders a dark card", () => {
    render(<Card>Click me</Card>);
    screen.getByText("Click me");
  });
});
