import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/ConfigService';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    app.setGlobalPrefix('api');

    const oas3Config = new DocumentBuilder()
      .setTitle('Product Service API')
      .setDescription('The Product Service API description')
      .setVersion('1.0')
      .addTag('product-service-api')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, oas3Config);
    SwaggerModule.setup('apispec', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    const configService = app.get(ConfigService);
    const appName = configService.getAppName;
    const port = configService.getAppPort || 5000;

    console.log({ msg: 'Server started', port, appName });
    await app.listen(port);
  } catch (error: unknown) {
    console.error(error);
  }
}
bootstrap();
