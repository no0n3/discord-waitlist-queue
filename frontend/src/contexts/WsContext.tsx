import { createContext, useContext, useEffect, useState } from "react";
import config from "../config";
import { AuthContext } from "./AuthContext";

const parseJSON = (jsonStr: string) => {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return {}
  }
}

const strToJson = (str: string) => {
  try {
    return parseJSON(str);
  } catch (e) {
    return {}
  }
}

const buildMessage = (type: string, payload: any) => JSON.stringify({ type, payload });

export const WsContext = createContext({
  ws: null,
} as any);

export default function WsContextProvider(props: any) {
  const [socket, setSocket] = useState<any>(null);
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const { loggedUser } = useContext(AuthContext);

  const token = loggedUser?.token;

  const initWS = () => {
    setSocket(createWS(token));
  };

  const createWS = (token: string) => {
    const ws = new WebSocket(config.WS_ENDPOINT + `?x-auth-token=${token}`);

    ws.onclose = () => {
      if ([WebSocket.CLOSED, WebSocket.CLOSING].includes(ws.readyState)) {
        ws.close();
      }

      setTimeout(() => {
        initWS();
      }, 5000);
    };

    ws.onerror = console.error;

    return ws;
  };

  const sendMessage = (type: string, msg: any) => {
    socket.send(buildMessage(type, msg));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    initWS();
  }, [token]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = (message: any) => {
      const msg: { type: string, payload: any } = strToJson(message.data as string);

      setLastMessage(msg);
    };
  }, [socket]);

  return (
    <WsContext.Provider value={{
      sendMessage,
      lastMessage
    }}>
      {props.children}
    </WsContext.Provider>
  );
};
