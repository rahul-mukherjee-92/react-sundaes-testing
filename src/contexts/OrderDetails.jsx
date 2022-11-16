import * as React from "react";
import { pricePerItem } from "../constants";

// format number as currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const OrderContext = React.createContext();

// custom hook to check whether context is inside provider or not
export function useOrderDetails() {
  const context = React.useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderDetails must be called inside OrderDetailsProvider"
    );
  }

  return context;
}

// export function OrderDetailsProvider(props) {
//   const [optionCounts, setOptionCounts] = React.useState({
//     scoops: {}, // example: { Chocolate: 1, Vanilla: 2 }
//     toppings: {}, // example: { "Gummi Bears": 1 }
//   });

//   function updateItemCount(itemName, newItemCount, optionType) {
//     // make a copy of existing state
//     const newOptionCounts = { ...optionCounts };

//     // update the copy with the new information
//     newOptionCounts[optionType][itemName] = newItemCount;

//     // update the state with the updated copy
//     setOptionCounts(newOptionCounts);
//   }

//   function resetOrder() {
//     setOptionCounts({ scoops: {}, toppings: {} });
//   }

//   // utility function to derive totals from optionCounts state value
//   function calculateTotal(optionType) {
//     // get an array of counts for the option type (for example, [1, 2])
//     const countsArray = Object.values(optionCounts[optionType]);

//     // total the values in the array of counts for the number of items
//     const totalCount = countsArray.reduce((total, value) => total + value, 0);

//     // multiply the total number of items by the price for this item type
//     return totalCount * pricePerItem[optionType];
//   }

//   const totals = {
//     scoops: calculateTotal("scoops"),
//     toppings: calculateTotal("toppings"),
//   };

//   const value = { optionCounts, totals, updateItemCount, resetOrder };
//   return <OrderContext.Provider value={value} {...props} />;
// }

function calcSubtotal(optionType, optCounts) {
  let optCount = 0;
  for (const count of optCounts[optionType].values()) {
    optCount += count;
  }

  return optCount * pricePerItem[optionType];
}

export function OrderDetailsProvider(props) {
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
      // const optionsMap = optCounts[optionType];
      const optionsMap = newOptCounts[optionType];
      optionsMap.set(itemName, parseInt(newItemCount));
      setOptCounts(newOptCounts);
    }

    function resetOrder() {
      setOptCounts({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    // getter: obj containing option counts for scoops & toppings, subtotals & total
    // setter: func to update option count
    return [{ ...optCounts, totals }, updateItemCount, resetOrder];
  }, [optCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}

// export { useOrderDetails, OrderDetailsProvider };
