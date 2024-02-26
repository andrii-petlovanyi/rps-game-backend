import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { GameSessionService } from 'src/models/game-session/game-session.service';
import { GameSessionDao } from 'src/models/game-session/dao/game-session.dao';
import { PrismaProvider } from 'src/providers/database/prisma.provider';

@Module({
  controllers: [],
  providers: [
    WebsocketService,
    GameSessionService,
    GameSessionDao,
    PrismaProvider,
  ],
  exports: [WebsocketService],
})
export class WebSocketModule {}
