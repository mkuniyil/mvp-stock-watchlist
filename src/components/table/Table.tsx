import { useCallback } from "react";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import "./index.css";
import TableBody from "./table-body/TableBody";
import TableHeader from "./table-header/TableHeader";
import { TEST_IDS } from "../../constants";

const Table = ({ disabled }: { disabled: boolean }) => {
  const { messages, unsubscribe } = useWebSocketContext();

  const handleDelete = useCallback(
    (isin: string) => unsubscribe(isin),
    [unsubscribe]
  );

  return (
    <table className="table">
      {disabled && <div className="overlay" data-testid={TEST_IDS.OVERLAY} />}
      <TableHeader />
      <TableBody
        messages={Array.from(messages?.values() || [])}
        handleDelete={handleDelete}
      />
    </table>
  );
};

export default Table;
