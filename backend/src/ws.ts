import { verifyJwt } from "./auth";

const connections = [];

export const setUpWs = (app) => {
  app.ws('/ws', (ws, req) => {
    const token = req.query['x-auth-token'];
    if (!verifyJwt(token)) {
      ws.close();

      return;
    }

    connections.push(ws);

    ws.on('message', (msg: String) => {
      ws.send(msg);
    });

    ws.on('close', () => {
      for (let i = 0; i < connections.length; i++) {
        if (ws === connections[i]) {
          connections.splice(i, 1);

          break;
        }
      }
    });
  });
};

export const send = (payload: { type: string, payload: any }) => {
  const jsonPayload = JSON.stringify(payload);

  connections.forEach(connection => {
    connection.send(jsonPayload);
  });
};
