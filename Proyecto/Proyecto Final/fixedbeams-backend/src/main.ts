import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require("cookie-parser");
const express = require("express");

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;

  app.use(cookieParser("SECRET-CODE"));
  app.enableCors();
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  
  await app.listen(3000);
}
bootstrap();
