import { Injectable } from '@nestjs/common';
import { GameSessionDao } from './dao/game-session.dao';
import {
  ICreateGameSession,
  IUpdateGameSession,
} from './interface/game-session.interface';

@Injectable()
export class GameSessionService {
  constructor(private readonly gameSessionDao: GameSessionDao) {}

  createGameSession(data: ICreateGameSession) {
    return this.gameSessionDao.createGameSession(data);
  }

  createOrUpdateGameSession(id: string, data: ICreateGameSession) {
    return this.gameSessionDao.createOrUpdateGameSession(id, data);
  }

  updateGameSession(id: string, data: IUpdateGameSession) {
    return this.gameSessionDao.updateGameSession(id, data);
  }

  findAllSessionsByRoomId(roomId: string) {
    return this.gameSessionDao.findAllSessionsByRoomId(roomId);
  }

  findAllPlayersByRoomId(roomId: string, userId: string) {
    return this.gameSessionDao.findAllPlayersByRoomId(roomId, userId);
  }

  findSessionById(id: string) {
    return this.gameSessionDao.findSessionById(id);
  }

  async deleteGameSession(id: string) {
    const session = await this.gameSessionDao.findSessionById(id);

    if (!session) {
      return null;
    }

    return this.gameSessionDao.deleteGameSession(id);
  }
}
