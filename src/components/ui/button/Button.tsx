import { ButtonHTMLAttributes } from "react";
import { TEST_IDS } from "../../../constants";
import "./index.css";

const Button = ({
  type,
  onClick,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="button"
      data-testid={TEST_IDS.BUTTON}
    >
      {children}
    </button>
  );
};

export default Button;
