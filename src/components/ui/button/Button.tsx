import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import { TEST_IDS } from "../../../constants";
import "./index.css";

const Button = ({
  type,
  onClick,
  children,
  className,
  ariaLabel,
}: ButtonHTMLAttributes<HTMLButtonElement> & { ariaLabel?: string }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames("button", className)}
      aria-label={ariaLabel}
      data-testid={TEST_IDS.BUTTON}
    >
      {children}
    </button>
  );
};

export default Button;
