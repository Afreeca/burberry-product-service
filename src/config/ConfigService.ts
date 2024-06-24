import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService extends NestConfigService {
  get getAppPort(): number | undefined {
    return this.get<number>('APP_PORT');
  }

  get getAppName(): number | undefined {
    return this.get<number>('APP_NAME');
  }

  get getEnvironment(): number | undefined {
    return this.get<number>('NODE_ENV');
  }

  get getMongoUser(): string | undefined {
    return this.get<string>('MONGO_ATLAS_USER');
  }

  get getMongoPassword(): string | undefined {
    return this.get<string>('MONGO_ATLAS_PASSWORD');
  }

  get getAuth0Audience(): string | undefined {
    return this.get<string>('AUTH0_AUDIENCE');
  }

  get getAuth0Domain(): string | undefined {
    return this.get<string>('AUTH0_DOMAIN');
  }
}
