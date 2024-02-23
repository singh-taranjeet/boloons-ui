import { screen, render } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { CreateGame } from "./index";
// import logroles
import { logRoles } from "@testing-library/dom";

test("CreateGame", () => {
  vi.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));
  render(<CreateGame />);
});
