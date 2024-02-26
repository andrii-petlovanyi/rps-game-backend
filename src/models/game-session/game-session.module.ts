import { Module } from '@nestjs/common';
import { GameSessionService } from './game-session.service';
import { GameSessionDao } from './dao/game-session.dao';
import { PrismaProvider } from 'src/providers/database/prisma.provider';

@Module({
  controllers: [],
  providers: [GameSessionDao, GameSessionService, PrismaProvider],
})
export class GameSessionModule {}
