import classNames from "classnames";
import { FormEvent, useCallback, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { TEST_IDS } from "../../constants";
import { useWebSocketContext } from "../../hooks/useWebSocketContext";
import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import { validateForm } from "./helper";
import "./index.css";

const ISINForm = ({ disabled }: { disabled: boolean }) => {
  const { messages, subscribe } = useWebSocketContext();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement);
      const value = formData.get("isin") as string;
      const error = validateForm(value, messages);

      if (error) {
        setError(error);
        return;
      }

      subscribe(value, true);
      setError(null);
      (e.target as HTMLFormElement).reset();
    },
    [messages, subscribe]
  );

  return (
    <div className="form-container" data-testid={TEST_IDS.ISIN_FORM}>
      <form className="content" onSubmit={handleSubmit}>
        <Input
          id="isin"
          name="isin"
          placeholder="ISIN (e.g. US0378331005)"
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled}>
          Subscribe
        </Button>
      </form>
      <div
        className={classNames("error", {
          visible: !!error,
          hidden: !error,
        })}
        role="alert"
        aria-invalid="true"
      >
        <IoInformationCircleOutline size={16} color="var(--red-800)" />
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ISINForm;
