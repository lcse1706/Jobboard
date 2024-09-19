import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { ConfirmationModal } from "./ConfirmationModal";

expect.extend(toHaveNoViolations);

describe("ConfirmationModal component", () => {
  const mockCancel = jest.fn();
  const mockConfirm = jest.fn();

  const modalText = "Are you sure you want to delete this item?";

  test("renders modal with correct text and buttons", () => {
    render(
      <ConfirmationModal
        text={modalText}
        cancelButton={mockCancel}
        confirmationButton={mockConfirm}
      />
    );

    expect(screen.getByText(modalText)).toBeInTheDocument();

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls cancelButton function when Cancel button is clicked", () => {
    render(
      <ConfirmationModal
        text={modalText}
        cancelButton={mockCancel}
        confirmationButton={mockConfirm}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockCancel).toHaveBeenCalled();
  });

  test("calls confirmationButton function when Delete button is clicked", () => {
    render(
      <ConfirmationModal
        text={modalText}
        cancelButton={mockCancel}
        confirmationButton={mockConfirm}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockConfirm).toHaveBeenCalled();
  });

  test("has no accessibility violations", async () => {
    const { container } = render(
      <ConfirmationModal
        text={modalText}
        cancelButton={mockCancel}
        confirmationButton={mockConfirm}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
