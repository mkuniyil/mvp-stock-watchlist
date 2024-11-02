import classNames from "classnames";
import { FC } from "react";

interface PriceDifferenceProps {
  priceDifference: number;
  fadeOut: boolean;
}

const PriceDifference: FC<PriceDifferenceProps> = ({
  priceDifference,
  fadeOut,
}) => {
  return (
    <div
      className={classNames("change color", {
        transition: fadeOut,
        positive: priceDifference > 0,
        negative: priceDifference < 0,
      })}
    >
      {priceDifference > 0 ? "+" : ""}
      {priceDifference.toFixed(2)}
    </div>
  );
};

export default PriceDifference;
