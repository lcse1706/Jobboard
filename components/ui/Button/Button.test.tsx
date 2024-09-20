import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { Button } from "./Button";

expect.extend(toHaveNoViolations);
describe("Button component", () => {
  it("Button component should have no accessibility violations", async () => {
    const { container } = render(<Button label="Click me" />);
    const result = await axe(container);
    expect(result).toHaveNoViolations();
  });
  it("renders the button with label", () => {
    render(<Button label="Click me" />);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const button = screen.getByText("Click me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    const handleClick = jest.fn();
    render(<Button label="Disabled button" onClick={handleClick} disabled />);
    const button = screen.getByText("Disabled button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies additional class names", () => {
    render(<Button label="Styled button" className="extra-class" />);
    const button = screen.getByText("Styled button");
    expect(button).toHaveClass("extra-class");
  });
});
