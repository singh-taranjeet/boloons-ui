import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Page from "../../src/app/page";

describe("Home page", () => {
  it("renders the home page", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { name: /Boloons/i }));

    expect(screen.getByRole("img", { name: /brain/i }));

    expect(screen.getByRole("img", { name: /get started/i }));
  });
});
