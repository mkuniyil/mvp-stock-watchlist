import { InputHTMLAttributes } from "react";
import { TEST_IDS } from "../../../constants";
import "./index.css";

const Input = ({
  id,
  name,
  required,
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
      data-testid={TEST_IDS.INPUT}
    />
  );
};

export default Input;
