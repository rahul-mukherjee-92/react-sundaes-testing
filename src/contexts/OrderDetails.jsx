import * as React from "react";
import { pricePerItem } from "../constants";

// format number as currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const OrderContext = React.createContext();

// custom hook to check whether context is inside provider or not
function useOrderDetails() {
  const context = React.useContext(OrderContext);

  if (!context) {
    throw new Error("Context must be inside a provider");
  }

  return context;
}

function calcSubtotal(optionType, optCounts) {
  let optCount = 0;
  for (const count of optCounts[optionType].values()) {
    optCount += count;
  }

  return optCount * pricePerItem[optionType];
}

function OrderDetailsProvider(props) {
  const [optCounts, setOptCounts] = React.useState({
    scoops: new Map(),
    toppings: new Map(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = React.useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  React.useEffect(() => {
    const scoopsSubtotal = calcSubtotal("scoops", optCounts);
    const toppingsSubtotal = calcSubtotal("toppings", optCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optCounts]);

  const value = React.useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptCounts = { ...optCounts };

      // update count for a particular type of scoop/topping
      const optionsMap = optCounts[optionType];
      optionsMap.set(itemName, parseInt(newItemCount));
      setOptCounts(newOptCounts);
    }

    // getter: obj containing option counts for scoops & toppings, subtotals & total
    // setter: func to update option count
    return [{ ...optCounts, totals }, updateItemCount];
  }, [optCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}

export { useOrderDetails, OrderDetailsProvider };
