import { FC, ReactNode, useCallback, useRef, useState } from "react";
import useWebSocket from "../hooks/useWebSocket";
import { Message, WebSocketContext } from "./WebSocketContext";

export const WebSocketProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const ws = useRef<WebSocket | null>(null);
  const [isSocketOpen, setIsSocketOpen] = useState<boolean>(true);
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

  useWebSocket(ws, setIsSocketOpen, setMessagesCallback);

  const sendMessage = useCallback((message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  }, []);

  const subscribe = useCallback(
    (id: string) => sendMessage(JSON.stringify({ subscribe: id })),
    [sendMessage]
  );

  const unsubscribe = useCallback(
    (id: string) => {
      sendMessage(JSON.stringify({ unsubscribe: id }));
      setMessages((prevMessages) => {
        const updatedMessages = new Map(prevMessages);
        updatedMessages.delete(id);
        return updatedMessages;
      });
    },
    [sendMessage]
  );

  return (
    <WebSocketContext.Provider
      value={{ messages, subscribe, unsubscribe, isSocketOpen }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
