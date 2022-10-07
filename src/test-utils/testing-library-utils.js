import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const renderWithContext = (ui, options) => {
  return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export everything from RTL
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
