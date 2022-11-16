import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { AlertBanner } from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [orderNo, setOrderNo] = useState(null);
  const [, , resetOrder] = useOrderDetails();
  const [error, setError] = useState(false);

  const newOrder = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  // call api
  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((resp) => setOrderNo(resp?.data?.orderNumber))
      .catch((err) => {
        setError(true);
      });
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  const orderConfirmation = orderNo ? (
    <>
      <h2>Thank you!</h2>
      <p>Your order number is: {orderNo}</p>
      <Button onClick={newOrder}>Create new order</Button>
    </>
  ) : (
    <p>Loading...</p>
  );

  return <div style={{ textAlign: "center" }}>{orderConfirmation}</div>;
}
