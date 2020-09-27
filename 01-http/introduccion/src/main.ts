import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*Cualquier configuracion se realiza aqui antes de que arranque el servidosn*/
  app.use(cookieParser('Me agradan los poliperros'));
  app.set('view engine','ejs');// sera el motor a utilizar
  app.use(express.static('publico'));

  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: true,
        saveUninitialized: true,
        cookie: {secure: false},
        store: new FileStore(),
      }),
  );

  await app.listen(3001);
}
bootstrap();
