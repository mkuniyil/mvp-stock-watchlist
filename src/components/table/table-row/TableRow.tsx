import classNames from "classnames";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TEST_IDS } from "../../../constants";
import Button from "../../ui/button/Button";
import Percentage from "./components/Percentage";
import Price from "./components/Price";
import PriceDifference from "./components/PriceDifference";
import "./index.css";

interface TableRowProps {
  title: string;
  price: string;
  priceDifference?: number;
  percentage: number;
  ask: string;
  bid: string;
  onDelete: () => void;
}

const TableRow = ({
  title,
  price,
  priceDifference = 0,
  percentage = 0,
  ask,
  bid,
  onDelete,
}: TableRowProps) => {
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  useEffect(() => {
    if (priceDifference !== 0) setFadeOut(true);

    let timer: ReturnType<typeof setTimeout> | null = null;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => setFadeOut(false), 500);

    return () => clearTimeout(timer);
  }, [priceDifference]);

  return (
    <tr className="row" data-testid={TEST_IDS.TABLE_ROW}>
      <td className="title">{title}</td>
      <td className="price-container">
        <Price price={price} fadeOut={fadeOut} />
        <div className="change-ask-bid-container">
          <div className="change-percentage-container">
            <PriceDifference
              priceDifference={priceDifference}
              fadeOut={fadeOut}
            />
            <Percentage percentage={percentage} fadeOut={fadeOut} />
          </div>
          <div className="ask-bid-container">
            <div className={classNames("quote", { transition: fadeOut })}>
              <span className="text">ASK:</span>
              {ask}
            </div>
            <div className={classNames("quote", { transition: fadeOut })}>
              <span className="text">BID:</span>
              {bid}
            </div>
          </div>
          <Button
            className="delete-mobile"
            onClick={onDelete}
            ariaLabel="Unsubscribe"
          >
            Unsubscribe
          </Button>
        </div>
      </td>

      <td className="delete-container">
        <button className="delete" onClick={onDelete} aria-label="Unsubscribe">
          <IoMdClose size={20} />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
