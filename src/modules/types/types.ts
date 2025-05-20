import { WebSocket } from 'ws';

export type Msg = {
  ws: WebSocket,
  data: Buffer
}