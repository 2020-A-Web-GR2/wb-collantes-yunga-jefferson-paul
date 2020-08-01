import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req, Res,Headers
} from '@nestjs/common';
import {MascotaCreateDto} from "./dto/mascota.create-dto";
import {validate, ValidationError} from "class-validator";
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
        isNaN(parametrosRuta.edad)
        isNaN(parametrosRuta.altura)

        //throw new BadRequestException('no son numeros')
        //return 'ok';
        // Validar que es un numero

        const edad = Number(parametrosRuta.edad)
        const altura = Number(parametrosRuta.altura)
        return edad + altura;

    }
    @Get('parametros-consulta')
    parametrosConsulta(@Query() parametrosDeConsulta
    ){
        const tieneNombreYApellido = parametrosDeConsulta.nombre &&
            parametrosDeConsulta.apellido;
        /* const tieneNombreYApellido = parametrosDeConsulta.nombre != undefined &&
            parametrosDeConsulta.apellido != undefined;*/
        console.log('parametrosDeConsulta',parametrosDeConsulta);
        if (tieneNombreYApellido){
            return parametrosDeConsulta.nombre + ' '+ parametrosDeConsulta.apellido
        }else{
            return ':)';
        }
        //body params no se pueden eviar en el get

    }
    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosCuerpo
    ){
        //Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosCuerpo.casada;
        mascotaValida.edad = parametrosCuerpo.edad;
        mascotaValida.ligada = parametrosCuerpo.ligada;
        mascotaValida.nombre = parametrosCuerpo.nombre;
        mascotaValida.peso = parametrosCuerpo.peso;
        try{
            const errores: ValidationError[] =await validate(mascotaValida)
            if(errores.length>0){
                console.error('',errores);
                throw new BadRequestException('Error Validando')
            } else {
                const mensajeCorrecto = {
                    mesaje : 'Se creo Correctamente'
                }
                return mensajeCorrecto
            }
        }catch(e){
            console.error('error',e);
            throw new BadRequestException('Error al validar')
        }

    }
    //1 Guardar una cookie Insegura

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req,
        @Res()res
    ) {
        res.cookie(
            'galletaInsegura',
            'Tengo hambre'
        );
        const mensaje = {
            mensaje: 'OK cooki'
        };
        res.send(mensaje)
    }
    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req, //  request - PETICION
        @Res() res // response - RESPUESTA
    ) {
        res.cookie(
            'galletaSegura', // nombre
            'Web :3', // valor
            {
                secure: true
            }
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
        res.send(mensaje); // METODO EXPRESSJS
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,
        @Headers() headers // peticion - request
    ) {
        // ENCRIPCION DE LA POLIBURGUER CON EL ALGORITMO Q YO QUIERO
        console.log('Headers', headers);

        res.header('Cabecera','Dinamica'); // respuesta - response

        res.cookie('firmada', 'poliburguer', {signed: true});
        res.cookie('firmada1', 'poliburguer1', {signed: true});
        res.cookie('firmada2', 'poliburguer2', {signed: true});
        res.cookie('firmada3', 'poliburguer3', {signed: true});
        res.cookie('firmada4', 'poliburguer4', {signed: true});




        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

    //1 Guardar una cookie Insegura
    //2 Guardar una cookie Segura
    //3 Mostrar cookies
}