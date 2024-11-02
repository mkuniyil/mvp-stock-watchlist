import { FC } from "react";
import { Message } from "../../../providers/WebSocketContext";
import TableRow from "../table-row/TableRow";
import "./index.css";

interface TableBodyProps {
  messages: Message[];
  handleDelete: (isin: string) => void;
}

const TableBody: FC<TableBodyProps> = ({ messages, handleDelete }) => {
  if (Array.from(messages?.values() || []).length === 0) {
    return (
      <tbody className="table-body">
        <tr className="empty-table">
          <td>No data available</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="table-body">
      {Array.from(messages?.values()).map((message: Message) => (
        <TableRow
          key={message.isin}
          title={message.isin}
          price={message.price.toFixed(2)}
          priceDifference={message.priceDifference}
          percentage={message.percentage ?? 0}
          ask={message.ask.toFixed(2)}
          bid={message.bid.toFixed(2)}
          onDelete={() => handleDelete(message.isin)}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
