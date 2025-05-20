import { clients } from '../clients/clients';
import { WebSocketServer } from './server';
import { WebSocket } from 'ws';
import { type Msg } from '../types/types';

export class ServerManager {
  private server: WebSocketServer;

  constructor(port: number) {
    this.server = new WebSocketServer(port);
    console.log(`Server start on port ${port}`)
    this.setupHandlers();
  }

  private setupHandlers() {
    this.server.on('client_connected', (ws:WebSocket) => {
      clients.add(ws)
      clients.broadcast('OK from server')
    });
    
    this.server.on('message_received', this.handleMessage.bind(this));
  }

  private handleMessage(message: Msg) {
    console.log(message.data.toString())
  }
}