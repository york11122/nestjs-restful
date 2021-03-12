import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { verifyToken } from '@/utils/auth/jwt'
import { UseGuards } from '@nestjs/common'
import { WsAuthGuard } from '@/common/guards/ws-auth.guard'
@WebSocketGateway(81, { origins: "*:*", namespace: "notification" })
export class SocketGateway implements OnGatewayConnection {
  constructor() { }
  @WebSocketServer() ws: Server

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('message')
  handleMessage (client: any, payload: any): string {
    return 'Hello world!';
  }

  async handleConnection (client: Socket, ...args: any[]) {
    const token = client.handshake.query.token
    const [err, data] = await verifyToken(token, 'accessToken')
    if (err) {
      client.disconnect(true);
      return
    }
    client.join(data._id)
  }

  sendToAll (msg: string, userId: string) {
    this.ws.to(userId).emit('message', msg);
  }
}
