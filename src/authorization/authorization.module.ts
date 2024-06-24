import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/ConfigService';

@Module({
  providers: [ConfigService],
})
export class AuthorizationModule {}
