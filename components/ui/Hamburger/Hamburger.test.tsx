import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";

import Hamburger from "./Hamburger";

describe("Hamburger component", () => {
  it("renders the 'Open' button", () => {
    render(<Hamburger>Menu Content</Hamburger>);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("does not render children by default", () => {
    render(<Hamburger>Menu Content</Hamburger>);
    expect(screen.queryByText("Menu Content")).not.toBeInTheDocument();
  });

  it("toggles children visibility when 'Open' is clicked", () => {
    render(<Hamburger>Menu Content</Hamburger>);
    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Menu Content")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Open"));
    expect(screen.queryByText("Menu Content")).not.toBeInTheDocument();
  });
});
