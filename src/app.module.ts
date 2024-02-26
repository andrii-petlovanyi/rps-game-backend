import { Module } from '@nestjs/common';
import { WebSocketModule } from './models/websocket/websocket.module';
import { WebsocketGateway } from './models/websocket/websocket.gateway';
import { GameSessionModule } from './models/game-session/game-session.module';

@Module({
  imports: [WebSocketModule, GameSessionModule],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
