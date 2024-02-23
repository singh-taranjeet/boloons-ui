import { screen, render } from "@testing-library/react";
import { Href } from "@/app/components/Href";
import { describe, test, expect } from "vitest";

describe("Link", () => {
  test("renders a link", () => {
    render(<Href href="example link">Example link</Href>);
    expect(screen.getByRole("link", { name: "Example link" }));
  });
});
