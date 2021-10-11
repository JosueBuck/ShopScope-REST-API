import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
require("dotenv").config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('ShopeScope')
    .setDescription('The official documentation for the ShopeScope REST APi')
    .setVersion('0.0.1')
    .addTag('user')
    .addTag('weeks')
    .addTag('recipes')
    .addTag('lists')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT || 8080);

}
bootstrap();
