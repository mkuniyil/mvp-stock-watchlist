import { InputHTMLAttributes } from "react";
import { TEST_IDS } from "../../../constants";
import "./index.css";

const Input = ({
  id,
  name,
  required,
  disabled,
  placeholder,
  onBlur,
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      id={id}
      name={name}
      className="input"
      required={required}
      aria-required={required}
      placeholder={placeholder}
      onBlur={onBlur}
      disabled={disabled}
      data-testid={TEST_IDS.INPUT}
    />
  );
};

export default Input;
