import classNames from "classnames";
import { FC } from "react";

interface PriceProps {
  price: string;
  fadeOut: boolean;
}

const Price: FC<PriceProps> = ({ price, fadeOut }) => {
  return (
    <div
      className={classNames("price", {
        transition: fadeOut,
      })}
    >
      {price}
    </div>
  );
};

export default Price;
