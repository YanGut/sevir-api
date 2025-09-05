import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('Response');

  constructor(private readonly configService: ConfigService) {}

  use(request: Request, response: Response, nextFunction: NextFunction) {
    const { method, originalUrl: url } = request;
    const userAgent: string = request.get('user-agent') || '';
    const requestTime: number = new Date().getTime();

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength: string | undefined = response.get('content-length');
      const responseTime: number = new Date().getTime() - requestTime;

      if (
        this.configService.get('environment') === 'development' &&
        (statusCode === 200 || statusCode === 201)
      ) {
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${responseTime}ms ${userAgent}`,
        );
      }
    });
    nextFunction();
  }
}
