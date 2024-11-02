import { TEST_IDS } from "../constants";
import { useWebSocketContext } from "../hooks/useWebSocketContext";
import ISINForm from "./isin-form/ISINForm";
import Table from "./table/Table";
import Alert from "./ui/alert/Alert";

const AppContainer = () => {
  const { isSocketOpen } = useWebSocketContext();

  return (
    <main className="app">
      {!isSocketOpen && <Alert>Connection Lost, Data Not Updated</Alert>}
      <div className="container" data-testid={TEST_IDS.APP}>
        <ISINForm />
        <Table />
        {!isSocketOpen && (
          <div className="overlay" data-testid={TEST_IDS.OVERLAY} />
        )}
      </div>
    </main>
  );
};

export default AppContainer;
