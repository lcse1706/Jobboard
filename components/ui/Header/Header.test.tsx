import React from "react";

import { render, screen } from "@testing-library/react";

import { Header } from "./Header";

describe("Header component", () => {
  test("renders the Jobboard Logo", () => {
    render(<Header>Menu</Header>);

    const logoImage = screen.getByAltText("Jobboard Logo");
    expect(logoImage).toBeInTheDocument();
  });

  test("renders children content", () => {
    render(<Header>Menu</Header>);

    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  test("applies custom styles passed as props", () => {
    const customStyle = { backgroundColor: "red" };
    render(<Header style={customStyle}>Menu</Header>);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveStyle(customStyle);
  });
});
