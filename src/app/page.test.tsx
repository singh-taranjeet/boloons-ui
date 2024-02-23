import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "./page";

describe("Home page", () => {
  it("renders the home page", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { name: /Boloons/i }));

    expect(screen.getByRole("img", { name: /space-craft/i }));

    expect(screen.getByRole("link", { name: /Play sum addiction/i }));
  });
});
