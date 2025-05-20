import { WebSocketServer as WSServer, WebSocket } from 'ws';
import { EventEmitter } from 'events';

export class WebSocketServer extends EventEmitter {
  private wss: WSServer;

  constructor(port: number) {
    super();
    this.wss = new WSServer({ port });
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.wss.on('connection', (ws: WebSocket) => {
      this.emit('client_connected', ws); // Уведомление о новом клиенте
      
      ws.on('message', (data: string) => {
        this.emit('message_received', { ws, data }); // Триггер для обработки сообщений
      });

      ws.on('close', () => {
        this.emit('client_disconnected', ws); // Уведомление об отключении
      });
    });
  }

  public broadcast(message: string) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}