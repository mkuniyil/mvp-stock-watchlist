import { Message } from "../../providers/WebSocketContext";
import { ISIN_ERROR } from "./constants";

export const isValidIsin = (isin: string) => {
  const validIsinRegex = /^[A-Z]{2}[A-Z0-9]{10}$/;
  return validIsinRegex.test(isin);
};

export const validateForm = (
  isinValue: string,
  messages: Map<string, Message>
): string | null => {
  if (isinValue.length === 0) {
    return ISIN_ERROR.EMPTY_ISIN;
  }

  if (!isValidIsin(isinValue)) {
    return ISIN_ERROR.INVALID_ISIN;
  }

  if (messages.has(isinValue)) {
    return ISIN_ERROR.EXISTING_ISIN;
  }

  return null;
};
