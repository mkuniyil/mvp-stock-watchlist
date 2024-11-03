import { MutableRefObject, useEffect } from "react";
import { Message } from "../providers/WebSocketContext";

const SOCKET_URL = "ws://localhost:8425";

const useWebSocket = (
  ws: MutableRefObject<WebSocket | null>,
  setSocketStatus: (status: number) => void,
  setMessagesCallback: (message: Message) => void
) => {
  useEffect(() => {
    ws.current = new WebSocket(SOCKET_URL);

    ws.current.onopen = () => setSocketStatus(WebSocket.OPEN);

    ws.current.onmessage = (event: MessageEvent) =>
      setMessagesCallback(JSON.parse(event.data));

    ws.current.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      setSocketStatus(WebSocket.CLOSED);
    };

    ws.current.onclose = () => setSocketStatus(WebSocket.CLOSED);

    return () => ws.current?.close();
  }, [setSocketStatus, setMessagesCallback, ws]);
};

export default useWebSocket;
