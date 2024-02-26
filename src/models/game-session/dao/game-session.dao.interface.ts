import {
  ICreateGameSession,
  IGameSession,
  IGameSessionWithPlayers,
  IUpdateGameSession,
} from '../interface/game-session.interface';

export interface IGameSessionDao {
  createGameSession: (data: ICreateGameSession) => Promise<IGameSession>;
  updateGameSession: (
    id: string,
    data: IUpdateGameSession,
  ) => Promise<IGameSession>;
  findAllSessionsByRoomId: (roomId: string) => Promise<Array<IGameSession>>;
  findAllPlayersByRoomId: (
    roomId: string,
    userId: string,
  ) => Promise<Array<IGameSessionWithPlayers>>;
  findSessionById: (id: string) => Promise<IGameSession>;
  deleteGameSession: (id: string) => Promise<IGameSession>;
}
