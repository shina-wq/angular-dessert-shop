import { ErrorHandler, Service, inject } from '@angular/core';
import { LoggerService } from './logger.service';

/**
 * Replaces Angular's default ErrorHandler (see app.config.ts) so every
 * uncaught error is recorded by the LoggerService instead of only going to
 * the console.
 */
@Service({ autoProvided: false })
export class LoggingErrorHandler implements ErrorHandler {
  private readonly logger = inject(LoggerService);

  handleError(error: unknown): void {
    this.logger.error('Unexpected error', error);
  }
}
