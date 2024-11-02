import "./index.css";

const TableHeader = () => {
  return (
    <thead>
      <tr className="table-header">
        <th className="title">ISIN</th>
        <th className="price">Price</th>
        <th className="price-difference">Change</th>
        <th className="percentage">Change %</th>
        <th className="ask">Ask</th>
        <th className="bid">Bid</th>
        <th className="delete">Delete</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
