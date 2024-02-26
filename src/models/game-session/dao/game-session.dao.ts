import { Injectable } from '@nestjs/common';
import { IGameSessionDao } from './game-session.dao.interface';
import {
  ICreateGameSession,
  IGameSession,
  IGameSessionWithPlayers,
  IUpdateGameSession,
} from '../interface/game-session.interface';
import { PrismaProvider } from 'src/providers/database/prisma.provider';

@Injectable()
export class GameSessionDao implements IGameSessionDao {
  constructor(private prisma: PrismaProvider) {}

  createGameSession(data: ICreateGameSession): Promise<IGameSession> {
    return this.prisma.gameSession.create({ data });
  }

  createOrUpdateGameSession(
    id: string,
    data: ICreateGameSession,
  ): Promise<IGameSession> {
    return this.prisma.gameSession.upsert({
      where: {
        id,
      },
      update: data,
      create: data,
    });
  }

  updateGameSession(
    id: string,
    data: IUpdateGameSession,
  ): Promise<IGameSession> {
    return this.prisma.gameSession.update({
      where: { id },
      data,
    });
  }

  findAllSessionsByRoomId(roomId: string): Promise<IGameSession[]> {
    return this.prisma.gameSession.findMany({
      where: { roomId },
    });
  }

  findAllPlayersByRoomId(
    roomId: string,
    userId: string,
  ): Promise<IGameSessionWithPlayers[]> {
    return this.prisma.gameSession.findMany({
      where: { roomId, userId: { not: userId } },
      include: { user: true },
    });
  }

  findSessionById(id: string): Promise<IGameSession> {
    return this.prisma.gameSession.findUnique({
      where: { id },
    });
  }

  deleteGameSession(id: string): Promise<IGameSession> {
    return this.prisma.gameSession.delete({
      where: { id },
    });
  }
}
