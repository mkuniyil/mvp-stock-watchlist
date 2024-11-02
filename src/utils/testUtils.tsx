import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { WebSocketProvider } from "../providers/WebSocketProvider";

export const renderWithProviders = (component: ReactNode) =>
  render(<WebSocketProvider>{component}</WebSocketProvider>);

export const generateMessages = (length: number) =>
  new Map(
    Array.from({ length }).map((_, i) => [
      `DE000BASF11${i}`,
      {
        isin: `DE000BASF11${i}`,
        price: i,
        bid: i,
        ask: i,
      },
    ])
  );
