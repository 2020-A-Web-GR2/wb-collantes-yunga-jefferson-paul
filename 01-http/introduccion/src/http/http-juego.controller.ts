import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from '@nestjs/common';
//http -> juegos - http
//http://localhost:3001/juegos-http
@Controller('juegos-http')


export class HttpJuegoController{


    @Get('hola')
    @HttpCode(201)
    // no es necesatrio poner publico el metodo
    holaGet(){
        throw new BadRequestException('No envia nada')
        //return 'Hola Get!'
    }
    @Post('hola')
    @HttpCode(202)
    // no es necesatrio poner publico el metodo
    holaPost(){
        return 'Hola Post!'
    }
    @Delete ('hola')
    @HttpCode(204)
    @Header('Cache-contrl','none')
    @Header('EPN','probando las cosas')
    holaDelete(){
        return 'Hola Delete!'
    }

    //Parametros de ruta
    // dos puntos para recibir el parametro
    //para acceder http://localhost:3001/juegos-http/parametros-ruta/21/gestion/1.55
    //parametros de ruta de consulta
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param ()parametrosRuta
    ){
        console.log('Parametos',parametrosRuta);
        /*if(parametrosRuta.edad,parametrosRuta.altura) {
            isNaN(parametrosRuta.edad)
            isNaN(parametrosRuta.altura)
            throw new BadRequestException('no son numeros')
        }*/
        /*isNaN(parametrosRuta.edad)
        isNaN(parametrosRuta.altura)
        throw new BadRequestException('no son numeros')*/
        //return 'ok';
        // Validar que es un numero
        const edad = Number(parametrosRuta.edad)
        const altura = Number(parametrosRuta.altura)
        return edad + altura;

    }

}