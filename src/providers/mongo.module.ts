import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('MONGO_ATLAS_USER')}:${configService.get('MONGO_ATLAS_PASSWORD')}@cluster0.vurl3pf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      }),
    }),
  ],
  providers: [],
})
export class MongoModule {}
