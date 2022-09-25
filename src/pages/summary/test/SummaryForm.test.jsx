import { fireEvent, render, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmBtn = screen.getByRole("button", { name: /Confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(confirmBtn).toBeDisabled();

  fireEvent.click(checkbox);
  expect(confirmBtn).toBeEnabled();

  fireEvent.click(checkbox);
  expect(confirmBtn).toBeDisabled();
});

test("Checkbox enables button on first click & disables on second", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmBtn = screen.getByRole("button", { name: /Confirm order/i });

  fireEvent.click(checkbox);
  expect(confirmBtn).toBeEnabled();

  fireEvent.click(checkbox);
  expect(confirmBtn).toBeDisabled();
});
