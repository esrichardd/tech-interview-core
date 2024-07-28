import { Injectable, LoggerService as ILoggerService } from '@nestjs/common';
import { createLogger, format, transports, Logger, addColors } from 'winston';
export type SupportedLoggedMethods =
  | 'info'
  | 'error'
  | 'warn'
  | 'debug'
  | 'verbose';

const colors = {
  info: 'green',
  warn: 'yellow',
  error: 'red',
};

addColors(colors);

@Injectable()
export class LoggerService implements ILoggerService {
  private logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      exitOnError: false,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss' }),
        format.json(),
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.json()),
        }),
      ],
    });
  }

  #logWithOptionalContext(
    method: SupportedLoggedMethods,
    message: any,
    context?: string,
  ) {
    context
      ? this.logger[method](`[${context}] ->`, { message: message })
      : this.logger[method](message);
  }

  log(message: any, context?: string) {
    this.info(message, context);
  }

  info(message: any, context?: string) {
    this.#logWithOptionalContext('info', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.#logWithOptionalContext('error', message, context);
    if (trace) {
      context
        ? this.logger.error(`[${context}] ->`, { message: trace })
        : this.logger.error(trace);
    }
  }
  warn(message: any, context?: string) {
    this.#logWithOptionalContext('warn', message, context);
  }
  debug?(message: any, context?: string) {
    this.#logWithOptionalContext('debug', message, context);
  }
  verbose?(message: any, context?: string) {
    this.#logWithOptionalContext('verbose', message, context);
  }
}
export default LoggerService;
