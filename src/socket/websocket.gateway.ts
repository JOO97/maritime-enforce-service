import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(1222)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    // 当客户端连接时触发
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    // 当客户端断开连接时触发
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string) {
    // 处理客户端发送的消息
    // 广播消息给所有连接的客户端
    this.server.emit('message', data);
  }
}
