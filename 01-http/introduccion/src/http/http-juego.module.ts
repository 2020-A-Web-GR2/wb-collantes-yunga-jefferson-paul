// @Nombre Decorador
// los modulos sirven para gestionar los cotroladores y servicios- se pueden referenciar a mas modulos
import {Module} from '@nestjs/common';
import {HttpJuegoController} from './http-juego.controller';


@Module ({
    imports: [],
    controllers: [
        HttpJuegoController
    ],
    providers: [],
})
export class HttpJuegoModule {

}
