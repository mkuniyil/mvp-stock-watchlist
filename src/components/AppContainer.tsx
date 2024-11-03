import { TEST_IDS } from "../constants";
import { useWebSocketContext } from "../hooks/useWebSocketContext";
import ISINForm from "./isin-form/ISINForm";
import Table from "./table/Table";
import Alert from "./ui/alert/Alert";

const AppContainer = () => {
  const { socketStatus } = useWebSocketContext();

  const displayOverlay = !(
    socketStatus === WebSocket.OPEN || socketStatus === null
  );

  return (
    <main className="app">
      {displayOverlay && <Alert>Connection Lost, Data Not Updated</Alert>}
      <div className="container" data-testid={TEST_IDS.APP}>
        <ISINForm />
        <Table />
        {displayOverlay && (
          <div className="overlay" data-testid={TEST_IDS.OVERLAY} />
        )}
      </div>
    </main>
  );
};

export default AppContainer;
