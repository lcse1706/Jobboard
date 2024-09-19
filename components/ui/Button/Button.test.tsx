import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Button } from "./Button";

describe("Button component", () => {
  expect.extend(toHaveNoViolations);
  test("Button component should have no accessibility violations", async () => {
    const { container } = render(<Button label="Click me" />);
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
  it("renders the button with label", () => {
    render(<Button label="Click me" />);

    // Check if the text "Click me" is displayed
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn(); // Mock the onClick function
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByText("Click me");

    // Simulate a button click
    fireEvent.click(button);

    // Check if the function was called once
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    const handleClick = jest.fn();
    render(<Button label="Disabled button" onClick={handleClick} disabled />);

    const button = screen.getByText("Disabled button");

    // Check if the "disabled" attribute is set
    expect(button).toBeDisabled();

    // Simulate a button click
    fireEvent.click(button);

    // Check if the function was not called
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies additional class names", () => {
    render(<Button label="Styled button" className="extra-class" />);

    const button = screen.getByText("Styled button");

    // Check if the additional "extra-class" is added
    expect(button).toHaveClass("extra-class");
  });
});
