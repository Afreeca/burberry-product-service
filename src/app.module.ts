import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigService } from './config/ConfigService';
import { validate } from './config/validation';
import { ProductModule } from './product/product.module';
import { MongoModule } from './providers/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.dev.env',
    }),
    MongoModule,
    ProductModule,
    AuthorizationModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
