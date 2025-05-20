import { WebSocket } from 'ws';

export const clients = {
  list: new Set<WebSocket>(),
  
  add(ws: WebSocket) {
    this.list.add(ws);
  },
  
  delete(ws: WebSocket) {
    this.list.delete(ws);
  },
  
  broadcast(message: string) {
    this.list.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
};