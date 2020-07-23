import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [HttpJuegoModule,UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
