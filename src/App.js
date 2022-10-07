import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* summary & entry page need info from provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page dont need provider */}
    </Container>
  );
}

export default App;
