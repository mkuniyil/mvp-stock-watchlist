import { useCallback } from "react";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import "./index.css";
import TableBody from "./table-body/TableBody";
import TableHeader from "./table-header/TableHeader";

const Table = () => {
  const { messages, unsubscribe } = useWebSocketContext();

  const handleDelete = useCallback(
    (isin: string) => unsubscribe(isin),
    [unsubscribe]
  );

  return (
    <table className="table">
      <TableHeader />
      <TableBody
        messages={Array.from(messages?.values() || [])}
        handleDelete={handleDelete}
      />
    </table>
  );
};

export default Table;
