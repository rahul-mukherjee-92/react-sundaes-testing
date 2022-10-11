import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { Options } from "../Options";
import OrderEntry from "../OrderEntry";

test("scoop subtotal changes when count updated", async () => {
  render(<Options optionType={"scoops"} />);

  // make sure subtotal starts at 0
  const subtotalText = screen.getByText("Scoops total $", { exact: false });
  expect(subtotalText).toHaveTextContent("0.00");

  // update vanilla count to 1 & check whether subtotal updates correspondingly
  const vanillaScoop = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, "1"); // it always takes string content
  expect(subtotalText).toHaveTextContent("2.00");

  // update chocolate count to 2 & check whether subtotal updates correspondingly
  const chocolateScoop = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, "2");
  expect(subtotalText).toHaveTextContent("6.00");
});

test("toppings subtotal changes when topping checkbox checked or unchecked", async () => {
  render(<Options optionType={"toppings"} />);

  // make sure subtotal starts at 0
  const subtotalText = screen.getByText("Toppings total $", { exact: false });
  expect(subtotalText).toHaveTextContent("0.00");

  // check Cherries checkbox & check for subtotal update
  const cherriesBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesBox);
  expect(subtotalText).toHaveTextContent("1.50");

  // check M&Ms checkbox & check for subtotal update
  const mmsBox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  userEvent.click(mmsBox);
  expect(subtotalText).toHaveTextContent("3.00");

  // uncheck Cherries checkbox & check for subtotal update
  userEvent.click(cherriesBox);
  expect(subtotalText).toHaveTextContent("1.50");
});

// GRAND TOTAL TESTS //
describe("grand total", () => {
  // test("grand total starts at $0.00", () => {
  //   render(<OrderEntry />);
  //   const grandtotalText = screen.getByText("Grand total $", { exact: false });
  //   expect(grandtotalText).toHaveTextContent("0.00");
  // });

  // We are including the above test within the below test bcoz it's already awaiting the promise resolution of ...
  // ...both axios calls for scoops & toppings
  test("grand total updates properly when scoop is added first", async () => {
    render(<OrderEntry />);
    const grandtotalText = screen.getByRole("heading", {
      name: /Grand total \$/,
    });
    expect(grandtotalText).toHaveTextContent("0.00");

    // update vanilla count to 1 & check whether grandtotal updates correspondingly
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "1"); // it always takes string content
    expect(grandtotalText).toHaveTextContent("2.00");

    // update chocolate count to 2 & check whether grandtotal updates correspondingly
    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "2");
    expect(grandtotalText).toHaveTextContent("6.00");

    // add a topping & check grandtotal
    const cherriesBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesBox);
    expect(grandtotalText).toHaveTextContent("7.50");
  });

  test("grand total updates properly when topping is added first", async () => {
    render(<OrderEntry />);
    const grandtotalText = screen.getByText("Grand total $", { exact: false });

    // add 1st topping & check grandtotal
    const cherriesBox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesBox);
    expect(grandtotalText).toHaveTextContent("1.50");

    // add 2nd topping & check grandtotal
    const hotFudgeBox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeBox);
    expect(grandtotalText).toHaveTextContent("3.00");

    // add a scoop & check grandtotal
    const chocolateScoop = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    userEvent.clear(chocolateScoop);
    userEvent.type(chocolateScoop, "1");
    expect(grandtotalText).toHaveTextContent("5.00");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);
    const grandtotalText = screen.getByText("Grand total $", { exact: false });

    // add a topping & check grandtotal
    const hotFudgeBox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    });
    userEvent.click(hotFudgeBox);
    // expect(grandtotalText).toHaveTextContent("1.50");

    // add a scoop & check grandtotal
    const vanillaScoop = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "2");
    // expect(grandtotalText).toHaveTextContent("5.50");

    // remove the topping & check
    userEvent.click(hotFudgeBox);
    expect(grandtotalText).toHaveTextContent("4.00");

    // remove scoop & check
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, "0");
    expect(grandtotalText).toHaveTextContent("0.00");
  });
});
