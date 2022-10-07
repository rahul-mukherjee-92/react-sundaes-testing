import { render, screen } from "../../../test-utils/testing-library-utils";
import { Options } from "../Options";

test("displays img for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altTexts = scoopImages.map((e) => e.alt);
  expect(altTexts).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays img for each topping option from server", async () => {
  render(<Options optionType={"toppings"} />);

  //find images
  const toppingTmages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingTmages).toHaveLength(3);

  // confirm alt text
  const altTexts = toppingTmages.map((e) => e.alt);
  expect(altTexts).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
