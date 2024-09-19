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

    // Check if the modal text is rendered
    expect(screen.getByText(modalText)).toBeInTheDocument();

    // Check if the buttons are rendered
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

    // Click the "Cancel" button
    fireEvent.click(screen.getByText("Cancel"));

    // Verify that the cancelButton function has been called
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

    // Click the "Delete" button
    fireEvent.click(screen.getByText("Delete"));

    // Verify that the confirmationButton function has been called
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

    // Check if there are no accessibility violations
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
