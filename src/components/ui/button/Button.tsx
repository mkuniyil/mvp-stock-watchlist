import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";
import "./index.css";

const Button = ({
  type,
  onClick,
  children,
  className,
  ariaLabel,
  disabled,
  testId,
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  ariaLabel?: string;
  testId?: string;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames("button", className)}
      aria-label={ariaLabel}
      data-testid={testId}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
