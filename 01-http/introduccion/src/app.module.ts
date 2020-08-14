import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MascotaModule} from "./mascota/mascota.module";
import {VacunaModule} from "./vacuna/vacuna.module";
import {VacunaEntity} from "./vacuna/vacuna.entity";
import {MascotaEntity} from "./mascota/mascota.entity";

@Module({
  imports: [HttpJuegoModule,UsuarioModule,MascotaModule,VacunaModule,
    TypeOrmModule.forRoot({
      name:'default', // nombre de la conexion
      type: 'mysql', // postgres
      host: 'localhost', // ip
      port: 3306, // puerto
      username: 'root', // usuario
      password: 'root',// password
      database: 'prueba', // nombre de labase
      entities: [
          UsuarioEntity,
          VacunaEntity,
          MascotaEntity

      ],
      synchronize: true, // para sincronizar la base de datos
      dropSchema :false, // eliminar datos y esquema de datos
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
