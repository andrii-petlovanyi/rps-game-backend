import { ISessionUser } from './user.interface';

export interface ISayInRoomPayload {
  user: ISessionUser;
  message: string;
}

export interface IPlayerChoicePayload {
  choice: string;
}

export interface IRoundScorePayload {
  mainPlayer: number;
  opponent: number;
}
