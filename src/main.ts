import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaProvider } from './providers/database/prisma.provider';
import { config } from './configs/app/app.config';
import { LoggerService } from './configs/logger/logger.service';
import { appConstants } from './common/constants/app.constants';

const Logger = new LoggerService();
Logger.setContext(appConstants.APP_NAME);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: Logger,
  });
  app.enableCors({
    origin: ['https://rps-go.vercel.app'],
    methods: '*',
    credentials: true,
  });

  const prismaProvider = app.get(PrismaProvider);
  await prismaProvider.enableShutdownHooks(app);

  const PORT = config.PORT;

  await app.listen(PORT);
  Logger.log(` started on: http://localhost\:${PORT}`);
}
bootstrap();
