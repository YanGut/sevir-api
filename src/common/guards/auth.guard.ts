import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUserInfo } from 'src/common/types/request-with-user-info.type';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestWithUserInfo = context.switchToHttp().getRequest();
    const token: string | undefined = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('Missing or invalid Authorization header');
      throw new UnauthorizedException('Invalid or missing token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<{ userId: string }>(token);
      if (!payload || typeof payload.userId === 'undefined') {
        this.logger.warn('JWT payload does not contain userId');
        throw new UnauthorizedException('Invalid token payload');
      }
      request.userId = payload.userId;
    } catch (error) {
      this.logger.error('Token verification failed', (error as any)?.message ?? String(error));
      throw new UnauthorizedException(
        (error as any)?.name === 'TokenExpiredError'
          ? 'Token has expired'
          : 'Invalid or malformed token',
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: RequestWithUserInfo): string | undefined {
    const authHeader: string | undefined = request.header('Authorization');

    if (!authHeader) {
      this.logger.debug('Authorization header is missing');
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      this.logger.debug('Authorization header format is invalid');
      return undefined;
    }

    return token;
  }
}
