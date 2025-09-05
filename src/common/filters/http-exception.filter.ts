import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger(HttpExceptionFilter.name);

  constructor() {}

  catch(httpException: HttpException, argumentsHost: ArgumentsHost) {
    const context = argumentsHost.switchToHttp();
    const request: Request = context.getRequest();
    const response: Response = context.getResponse();
    const status: number = httpException.getStatus();
    const errorResponse: string | object = httpException.getResponse();

    this.logger.error(
      `Method: ${request.method} ${request.originalUrl} => ${status} error: ${httpException.message}`,
      httpException.stack,
    );

    response.status(status).json({
      error: true,
      errorResponse,
      timestamp: new Date().toISOString(),
    });
  }
}
