import { screen, render } from "@testing-library/react";
import { Button } from "@/app/components/Button";
import { describe, test, expect } from "vitest";

describe("Button", () => {
  test("renders a button", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" }));
  });
});
