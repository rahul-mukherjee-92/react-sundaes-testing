import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  // fireEvent.click(checkbox);
  userEvent.click(checkbox);
  expect(confirmBtn).toBeEnabled();

  userEvent.click(checkbox);
  expect(confirmBtn).toBeDisabled();
});

// test("popover responds to hover", async () => {
//   render(<SummaryForm />);

//   // set up userEvent
//   const user = userEvent.setup();

//   // popover starts out hidden
//   const nullPopover = screen.queryByText(/no ice cream will be delivered/i);
//   expect(nullPopover).not.toBeInTheDocument();

//   // popover appears upon mouseover of checkbox label
//   const termsAndConditions = screen.getByText(/terms and conditions/i);
//   await user.hover(termsAndConditions);
//   const popover = screen.getByText(/no ice cream will be delivered/i);
//   expect(popover).toBeInTheDocument();

//   // popover disappears when we mouse out
//   await user.unhover(termsAndConditions);
//   const overlay = screen.queryByText(/no ice cream will be delivered/i);
//   expect(overlay).not.toBeInTheDocument();
// });

test("popover behaviour on mouse hover on Terms & conditions", async () => {
  render(<SummaryForm />);

  // popover initially hidden
  const hiddenPopover = screen.queryByText(/no ice cream will be delivered/i);
  expect(hiddenPopover).not.toBeInTheDocument();

  // popover comes on hover
  userEvent.hover(screen.getByText(/terms and conditions/i));
  const popover = screen.getByText(/no ice cream will be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover again disappears when mouse moved out
  userEvent.unhover(screen.getByText(/terms and conditions/i));

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will be delivered/i)
  );
});
