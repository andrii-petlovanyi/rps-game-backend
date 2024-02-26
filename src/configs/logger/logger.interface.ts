import { LoggerService } from '@nestjs/common';

export interface ILoggerService extends LoggerService {
  setContext(context: string): void;
}
