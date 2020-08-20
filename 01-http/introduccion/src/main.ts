import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
const express = require('express');
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*Cualquier configuracion se realiza aqui antes de que arranque el servidosn*/
  app.use(cookieParser('Me agradan los poliperros'));
  app.set('view engine','ejs');
  app.use(express.static('publico'));
  await app.listen(3001);
}
bootstrap();
