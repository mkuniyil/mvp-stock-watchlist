import classNames from "classnames";
import { FC } from "react";

interface PercentageProps {
  percentage: number;
  fadeOut: boolean;
}

const Percentage: FC<PercentageProps> = ({ percentage, fadeOut }) => {
  return (
    <div
      className={classNames("percentage color", {
        transition: fadeOut,
        positive: percentage > 0,
        negative: percentage < 0,
      })}
    >
      <span className="sign">{percentage > 0 ? "+" : ""}</span>
      <span className="value">{percentage.toFixed(2)}%</span>
      <span className="mobile-value">
        {`(${percentage > 0 ? "+" : ""}${percentage.toFixed(2)}%)`}
      </span>
    </div>
  );
};

export default Percentage;
