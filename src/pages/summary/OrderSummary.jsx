import { useOrderDetails } from "../../contexts/OrderDetails";
import { SummaryForm } from "./SummaryForm";

export default function OrderSummary({ setOrderPhase }) {
  const [optionTotals] = useOrderDetails();

  const filterMap = (itemMap) => {
    for (let [key, value] of itemMap) {
      if (!value) itemMap.delete(key);
    }
    return itemMap;
  };

  const scoopsList = () => {
    const scoopsMap = filterMap(optionTotals?.scoops);
    let scoopsArr = [];
    for (let [item, count] of scoopsMap) {
      scoopsArr.push(<li key={item}>{count + " " + item}</li>);
    }

    return scoopsArr;
  };

  const toppingsList = () => {
    const toppingsMap = filterMap(optionTotals?.toppings);
    let toppingsArr = [];
    for (let topping of toppingsMap.keys()) {
      toppingsArr.push(<li key={topping}>{topping}</li>);
    }

    return toppingsArr;
  };

  return (
    <>
      <h1>Order Summary</h1>
      <div className="scoops">
        <h2>Scoops: {optionTotals.totals["scoops"]}</h2>
        <ul>{scoopsList()}</ul>
      </div>
      <div className="toppings">
        <h2>Toppings: {optionTotals.totals["toppings"]}</h2>
        <ul>{toppingsList()}</ul>
      </div>
      <h2>Total: {optionTotals.totals["grandTotal"]}</h2>

      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
}
