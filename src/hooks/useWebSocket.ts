import { MutableRefObject, useEffect } from "react";
import { Message } from "../providers/WebSocketContext";

const SOCKET_URL = "ws://localhost:8425";

const useWebSocket = (
  ws: MutableRefObject<WebSocket | null>,
  setIsSocketOpen: (isOpen: boolean) => void,
  setMessagesCallback: (message: Message) => void
) => {
  useEffect(() => {
    ws.current = new WebSocket(SOCKET_URL);

    ws.current.onopen = () => setIsSocketOpen(true);

    ws.current.onmessage = (event: MessageEvent) =>
      setMessagesCallback(JSON.parse(event.data));

    ws.current.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      setIsSocketOpen(false);
    };

    ws.current.onclose = () => setIsSocketOpen(false);

    return () => ws.current?.close();
  }, [setIsSocketOpen, setMessagesCallback, ws]);
};

export default useWebSocket;
