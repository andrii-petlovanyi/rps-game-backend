import {
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';
import {
  IPlayerChoicePayload,
  IRoundScorePayload,
  ISayInRoomPayload,
} from 'src/common/interfaces/socket-payload.interface';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: WebsocketService) {}

  async handleConnection(socket: Socket): Promise<void> {
    await this.socketService.handleConnect(socket, this.server);
  }

  handleDisconnect(socket: Socket): void {
    this.socketService.handleDisconnect(socket, this.server);
  }

  @SubscribeMessage('sayInRoom')
  handleSayHelloEvent(client: Socket, data: ISayInRoomPayload) {
    this.server
      .to(client.handshake.query.roomId)
      .emit('roomEcho', { message: data.message, user: data.user });
  }

  @SubscribeMessage('madeChoice')
  handleMadeChoiceEvent(client: Socket, data: IPlayerChoicePayload) {
    this.server.to(client.handshake.query.roomId).emit('getPlayerChoice', {
      choice: data.choice,
      userId: client.handshake.query.userId,
    });
  }

  @SubscribeMessage('endRound')
  handleEndRoundEvent(client: Socket) {
    this.server.to(client.handshake.query.roomId).emit('getEndRound', {
      userId: client.handshake.query.userId,
    });
  }

  @SubscribeMessage('roundScore')
  handleRoundScore(client: Socket, data: IRoundScorePayload) {
    this.server.to(client.handshake.query.roomId).emit('getRoundScore', {
      userId: client.handshake.query.userId,
      score: data,
    });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket) {
    await this.socketService.handleDisconnect(client, this.server);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket) {
    await this.socketService.handleConnect(client, this.server);
  }
}
