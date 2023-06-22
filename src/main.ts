import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('My CRM-system')
    .setDescription('The CRM-system API description')
    .setVersion('1.0')
    .addTag('CRM-system')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  // <<<<<<< HEAD
  await app.listen(3200);
  // =======
  // await app.listen(3100);
  // >>>>>>> 89c0bcdde92a9d1312b4c44ee757fa51cd616e26
}
bootstrap();
