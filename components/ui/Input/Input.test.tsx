import React from "react";
import { FieldError } from "react-hook-form";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Input } from "./Input";

jest.mock("../utils/cn", () => ({
  classMerge: (className: string) => className,
}));

describe("Input component", () => {
  it("renders an input with a label", () => {
    render(<Input label="Test Label" type="text" />);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    expect(input).toHaveAttribute("id");
  });

  it("forwards the ref to the input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input label="Test Ref" type="text" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("renders an error message when error prop is passed", () => {
    const error: FieldError = {
      message: "This field is required",
      type: "required",
    };
    render(<Input label="Test Label" type="text" error={error} />);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("applies custom class name from classMerge", () => {
    const customClass = "custom-input-class";
    render(<Input label="Test Label" type="text" className={customClass} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(customClass);
  });

  it("allows user to type in the input", async () => {
    render(<Input label="Test Label" type="text" />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, "Hello");

    expect(input).toHaveValue("Hello");
  });
});
