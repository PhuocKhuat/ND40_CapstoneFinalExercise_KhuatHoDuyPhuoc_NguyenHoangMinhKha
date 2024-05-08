import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(express.static('.'));

  const setTitle = new DocumentBuilder()
    .setTitle('ELearning')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'apiKey' too
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const setDocument = SwaggerModule.createDocument(app, setTitle);
  SwaggerModule.setup('/swagger', app, setDocument, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(8080);
}
bootstrap();
