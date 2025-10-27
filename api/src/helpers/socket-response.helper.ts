import { Socket } from 'socket.io';

export class SocketResponse {
  static error(data: SocketErrorResponse) {
    data.socket.emit('error', {
      message: data.message,
      data: data.data || {},
    });
  }
}

type SocketErrorResponse = {
  socket: Socket;
  message?: string;
  data?: any;
};
