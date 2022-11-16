import { Button, Row } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Options } from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  const [optionTotals] = useOrderDetails();
  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <Row>
        <h2>Grand total {optionTotals.totals.grandTotal}</h2>
        <Button
          style={{ width: "15%" }}
          onClick={() => setOrderPhase("review")}
        >
          Order Sundae!
        </Button>
      </Row>
    </div>
  );
}
