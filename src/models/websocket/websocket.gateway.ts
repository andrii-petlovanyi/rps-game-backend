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
    await this.socketService.handleJoinRoom(socket, this.server);
  }

  handleDisconnect(socket: Socket): void {
    this.socketService.handleLeaveRoom(socket, this.server);
  }

  @SubscribeMessage('sayInRoom')
  handleSayHelloEvent(client: Socket, data: ISayInRoomPayload): void {
    this.server
      .to(client.handshake.query.roomId)
      .emit('roomEcho', { message: data.message, user: data.user });
  }

  @SubscribeMessage('madeChoice')
  handleMadeChoiceEvent(client: Socket, data: IPlayerChoicePayload): void {
    this.server.to(client.handshake.query.roomId).emit('getPlayerChoice', {
      choice: data.choice,
      userId: client.handshake.query.userId,
    });
  }

  @SubscribeMessage('endRound')
  handleEndRoundEvent(client: Socket): void {
    this.server.to(client.handshake.query.roomId).emit('getEndRound', {
      userId: client.handshake.query.userId,
    });
  }

  @SubscribeMessage('roundScore')
  handleRoundScore(client: Socket, data: IRoundScorePayload): void {
    this.server.to(client.handshake.query.roomId).emit('getRoundScore', {
      userId: client.handshake.query.userId,
      score: data,
    });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket): Promise<void> {
    await this.socketService.handleLeaveRoom(client, this.server);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket): Promise<void> {
    await this.socketService.handleJoinRoom(client, this.server);
  }
}
