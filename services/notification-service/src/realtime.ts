type SocketLike = {
  readyState?: number;
  send: (data: string) => void;
};

const clients = new Set<SocketLike>();

export function addClient(ws: SocketLike) {
  clients.add(ws);
}

export function removeClient(ws: SocketLike) {
  clients.delete(ws);
}

export function broadcastNotification(payload: unknown) {
  const message = JSON.stringify(payload);

  for (const client of clients) {
    if (client.readyState === undefined || client.readyState === 1) {
      client.send(message);
    }
  }
}