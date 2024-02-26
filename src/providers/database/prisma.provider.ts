import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as process from 'process';

@Injectable()
export class PrismaProvider extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      Logger.error(error);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
