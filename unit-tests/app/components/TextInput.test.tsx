import { screen, render, fireEvent } from "@testing-library/react";
import { TextInput } from "@/app/components/TextInput";
import { describe, test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const baseProps = {
  value: "",
  onChange: vi.fn(),
  "aria-label": "example-input",
  onClick: vi.fn(),
};

describe("TextInput", () => {
  test("renders a input text", async () => {
    render(<TextInput {...baseProps} />);
    const textInput = screen.getByRole("textbox", { name: "example-input" });

    const user = userEvent.setup();

    await user.click(textInput);
    expect(baseProps.onClick).toBeCalled();

    await user.type(textInput, "Hello World");
    expect(baseProps.onChange).toBeCalledTimes(11);
  });
});
