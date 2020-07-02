import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*Cualquier configuracion se realiza aqui antes de que arranque el servidosn*/

  await app.listen(3001);
}
bootstrap();
