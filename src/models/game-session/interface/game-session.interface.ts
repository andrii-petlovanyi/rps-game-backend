export interface ICreateGameSession {
  id: string;
  roomId: string;
  userId: string;
}

export interface IGameSession extends ICreateGameSession {
  createdAt: Date;
  updatedAt: Date;
}

export interface IGameSessionWithPlayers extends IGameSession {
  user: any;
}

export interface IUpdateGameSession {
  roomId?: string;
  userId?: string;
}
