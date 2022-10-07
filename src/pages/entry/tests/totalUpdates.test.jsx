import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { Options } from "../Options";

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
