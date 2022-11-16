import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  // rnder app
  render(<App />);

  // add scoops & toppings
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "2");

  const vanillaScoop = screen.getByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "1");

  const cherriesBox = await screen.findByRole("checkbox", { name: "Cherries" });
  userEvent.click(cherriesBox);

  // find & click order button
  const orderBtn = screen.getByRole("button", { name: /order sundae/i });
  userEvent.click(orderBtn);

  // check summary page headings
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopHeading).toBeInTheDocument();

  const toppingHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingHeading).toBeInTheDocument();

  // check summary page option items
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // alternatively...
  // const optionItems = screen.getAllByRole("listitem");
  // const optionTexts = optionItems.map((item) => item.textContent);
  // expect(optionTexts).toEqual(["2 Chocolate", "1 Vanilla", "Cherries"]);

  // accept terms & conditions & click btn to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  userEvent.click(tcCheckbox);

  const confirmBtn = screen.getByRole("button", { name: /Confirm order/i });
  expect(confirmBtn).toHaveClass("confirm-btn");
  userEvent.click(confirmBtn);

  // confirm Thank You text & order no. display on confirmation page
  const thankYouHeading = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeading).toBeInTheDocument();

  const orderText = await screen.findByText("Your order number is:", {
    exact: false,
  });
  // expect(orderText).toHaveTextContent(/^[0-9]*$/);
  expect(orderText).toBeInTheDocument();

  // click on "new order" btn on confirmation page
  const newOrderBtn = screen.getByRole("button", { name: /create new order/i });
  userEvent.click(newOrderBtn);

  // check that scoops & toppings subtotals are reset
  const scoopsSubtotalText = screen.getByText("Scoops total $", {
    exact: false,
  });
  expect(scoopsSubtotalText).toHaveTextContent("0.00");

  const toppingsSubtotalText = screen.getByText("Toppings total $", {
    exact: false,
  });
  expect(toppingsSubtotalText).toHaveTextContent("0.00");

  // do we need to await anything to avoid errors?
  await screen.findByRole("spinbutton", { name: "Chocolate" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});
