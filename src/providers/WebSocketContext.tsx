import { createContext } from "react";

export interface Message {
  isin: string;
  price: number;
  bid: number;
  ask: number;
  priceDifference?: number;
  initialPrice?: number;
  percentage?: number;
}

interface WebSocketContextType {
  messages: Map<string, Message>;
  subscribe: (isin: string) => void;
  unsubscribe: (isin: string) => void;
  isSocketOpen: boolean;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);
