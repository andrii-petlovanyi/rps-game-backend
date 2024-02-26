import { ConsoleLogger } from '@nestjs/common';
import { ILoggerService } from './logger.interface';

export class LoggerService extends ConsoleLogger implements ILoggerService {
  setContext(context: string) {
    super.setContext(context);
  }
}
