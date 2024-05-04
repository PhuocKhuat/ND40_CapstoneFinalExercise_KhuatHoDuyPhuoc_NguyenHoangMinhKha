import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.use(express.static("."));
  
  const setTitle = new DocumentBuilder().addBearerAuth().setTitle("ELearning").build();
  const setDocument = SwaggerModule.createDocument(app, setTitle);
  SwaggerModule.setup("/swagger", app, setDocument);

  await app.listen(8080);
}
bootstrap();
