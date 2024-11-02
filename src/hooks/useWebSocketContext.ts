import { useContext } from "react";
import { WebSocketContext } from "../providers/WebSocketContext";

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
