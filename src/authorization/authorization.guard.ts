import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { ConfigService } from '../config/ConfigService';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private auth0_audience: string;
  private auth0_domain: string;
  constructor(private configService: ConfigService) {
    this.auth0_audience = configService.getAuth0Audience;
    this.auth0_domain = configService.getAuth0Domain;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const checkJwt = promisify(
      jwt.expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.auth0_domain}.well-known/jwks.json`,
        }) as any,
        audience: this.auth0_audience,
        issuer: this.auth0_domain,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJwt(req, res);
      return true;
    } catch (error: unknown) {
      let errorMessage = 'Authorization failed';

      if (error instanceof Error) {
        switch (error.name) {
          case 'UnauthorizedError':
            errorMessage = 'Invalid token';
            break;
          case 'TokenExpiredError':
            errorMessage = 'Token expired';
            break;
          case 'JsonWebTokenError':
            errorMessage = 'JWT error: ' + error.message;
            break;
          default:
            errorMessage = error.message;
        }
      }

      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Unauthorized',
        error: errorMessage,
      });
    }
  }
}
