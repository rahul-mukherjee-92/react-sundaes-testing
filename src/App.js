import { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary & entry page need info from provider */}
        {orderPhase === "inProgress" && (
          <OrderEntry setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "review" && (
          <OrderSummary setOrderPhase={setOrderPhase} />
        )}
        {orderPhase === "complete" && (
          <OrderConfirmation setOrderPhase={setOrderPhase} />
        )}
      </OrderDetailsProvider>
      {/* confirmation page dont need provider */}
    </Container>
  );
}

export default App;
