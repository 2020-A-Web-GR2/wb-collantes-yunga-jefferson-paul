import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
  imports: [HttpJuegoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
