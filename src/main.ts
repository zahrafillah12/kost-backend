import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  const config = new DocumentBuilder()
    .setTitle('Kost API')
    .setDescription('Backend Booking Kost')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  
  console.log(process.env.JWT_SECRET);
  console.log('http://localhost:3000');
  console.log('http://localhost:3000/api');
}

bootstrap();