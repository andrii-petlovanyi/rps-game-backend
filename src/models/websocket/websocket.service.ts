import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameSessionService } from 'src/models/game-session/game-session.service';

@Injectable()
export class WebsocketService {
  constructor(private readonly gameSessionService: GameSessionService) {}

  async handleJoinRoom(socket: Socket, server: Server): Promise<void> {
    const players = await this.gameSessionService.findAllPlayersByRoomId(
      socket.handshake.query.roomId as string,
      socket.handshake.query.userId as string,
    );

    await this.gameSessionService.createOrUpdateGameSession(socket.id, {
      id: socket.id,
      roomId: socket.handshake.query.roomId as string,
      userId: socket.handshake.query.userId as string,
    });

    server.emit('playersInRoom', players);

    socket.join(socket.handshake.query.roomId);
    this.notifyOnJoinRoom(socket, server);
  }

  async handleLeaveRoom(socket: Socket, server: Server): Promise<void> {
    const session = await this.gameSessionService.deleteGameSession(socket.id);
    if (session) {
      socket.leave(session.roomId);
    }
    this.notifyOnLeaveRoom(socket, server);
  }

  private notifyOnJoinRoom(socket: Socket, server: Server): void {
    server.to(socket.handshake.query.roomId).emit('userJoined', {
      message: `User ${socket.handshake.query.username} joined in room`,
      username: socket.handshake.query.username,
      userId: socket.handshake.query.userId,
    });
  }

  private notifyOnLeaveRoom(socket: Socket, server: Server): void {
    server.to(socket.handshake.query.roomId).emit('userLeft', {
      message: `User ${socket.handshake.query.username} leave room`,
      username: socket.handshake.query.username,
      userId: socket.handshake.query.userId,
    });
  }
}
