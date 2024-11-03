import { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { Message, WebSocketContext } from "./WebSocketContext";
import {
  getKeysFromLocalstorage,
  removeKeyFromLocalstorage,
  saveKeyToLocalstorage,
} from "../utils/storageUtils";

export const WebSocketProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const ws = useRef<WebSocket | null>(null);
  const [socketStatus, setSocketStatus] = useState<number | null>(null);
  const [messages, setMessages] = useState<Map<string, Message>>(new Map());

  const calculatePriceDifferenceAndPercentage = (
    message: Message,
    previousMessage: Message
  ) => {
    message.initialPrice = previousMessage.initialPrice;
    message.priceDifference =
      message.price - (previousMessage.initialPrice ?? 0);
    message.percentage =
      ((message.price - (previousMessage.initialPrice ?? 0)) /
        (previousMessage.initialPrice ?? 0)) *
      100;
  };

  const setMessagesCallback = useCallback((message: Message) => {
    setMessages((prevMessages) => {
      const isin = message.isin.toUpperCase();
      const updatedMessages = new Map(prevMessages);

      if (!updatedMessages.has(isin)) {
        message.initialPrice = message.price;
      } else {
        const previousMessage = updatedMessages.get(isin);

        if (previousMessage) {
          calculatePriceDifferenceAndPercentage(message, previousMessage);
        }
      }

      updatedMessages.set(isin, message);
      return updatedMessages;
    });
  }, []);

  useWebSocket(ws, setSocketStatus, setMessagesCallback);

  const sendMessage = useCallback((message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  }, []);

  const subscribe = useCallback(
    (id: string, saveToLocalstorage: boolean) => {
      sendMessage(JSON.stringify({ subscribe: id }));

      if (saveToLocalstorage) saveKeyToLocalstorage(id);
    },
    [sendMessage]
  );

  const unsubscribe = useCallback(
    (id: string) => {
      setMessages((prevMessages) => {
        const updatedMessages = new Map(prevMessages);
        updatedMessages.delete(id);
        return updatedMessages;
      });
      sendMessage(JSON.stringify({ unsubscribe: id }));
      removeKeyFromLocalstorage(id);
    },
    [sendMessage]
  );

  useEffect(() => {
    if (socketStatus === null) return;

    const keys = getKeysFromLocalstorage();
    keys.forEach((key: string) => {
      subscribe(key, false);
    });
  }, [subscribe, socketStatus]);

  return (
    <WebSocketContext.Provider
      value={{ messages, subscribe, unsubscribe, socketStatus }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
