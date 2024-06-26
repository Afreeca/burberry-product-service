import { Module } from '@nestjs/common';
import { ConfigService } from '../config/ConfigService';

@Module({
  providers: [ConfigService],
})
export class AuthorizationModule {}
