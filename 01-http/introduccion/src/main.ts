import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*Cualquier configuracion se realiza aqui antes de que arranque el servidosn*/


  app.use(cookieParser('Me agradan los poliperros'));
  await app.listen(3001);
}
bootstrap();
