import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Put,
  Query,
  Headers,
  Post,
  Param,
  BadRequestException, Req, Res
} from '@nestjs/common';
import { AppService } from './app.service';
import {log} from "util";

@Controller('deber-calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  //http://localhost:3000/deber-calculadora/registrarUsuaior?usuario=Jefferson
  @Get('registrarUsuario')
  @HttpCode(201)
  guardarUsuario(
      @Query() parametroDeConsulta,
      @Req() req,
      @Res()res){
    res.cookie('usuario',parametroDeConsulta.usuario);
    res.cookie('puntos','100',{signed:true});
    console.log('Se ha creado la cookie para: ', req.cookies['usuario']);
    console.log('Se ha creado los puntos ', req.signedCookies['puntos']);
    res.send({
      mensaje: 'Guardado correctamente'
    });

  }
  @Get('mostrarCookies')
  mostrarCookies(
      @Req() req
  ){
    const mensaje={
      sinFirmar: req.cookies,
      firmadas: req.signedCookies
    }
    return mensaje;
  }
  existeUsuario(
      req
  ): boolean{
    const existeCookieUsuario: object = req.cookies;
    return (existeCookieUsuario['usuario'])? true: false;
  }

  //http://localhost:3000/deber-calculadora/sumar
  @Get('sumar')
  @HttpCode(200)
  parametrosConsulta(
      @Query() parametrosDeConsulta,
      @Req() req,
      @Res() res){
    const validarUsuario = req.cookies['usuario']
    if (validarUsuario){
      const numero1 = Number(parametrosDeConsulta.numero1)
      const numero2 = Number(parametrosDeConsulta.numero2)
      const suma = numero1+numero2
      const puntos = req.signedCookies['puntos']
      const nuevosPuntos = (Number(puntos) - Math.abs(suma));
      if (numero1 && numero2){
        if (Number(nuevosPuntos) <= 0) {
          res.cookie('puntos', '100', {signed: true});
          const mensaje = {
            Suma: suma,
            Puntos: String(req.cookies['usuario']).concat(", se acabaron tus puntos, se han restablecido en 100")
          }
          res.send(mensaje)
        }else{
          res.cookie('puntos', nuevosPuntos, {signed: true});
          const mensaje = {
            Suma: suma,
            Puntos: nuevosPuntos
          }
          res.send(mensaje)
        }

      }
      return 'datos invalidos';
    }else{
      throw new BadRequestException('Registre un usuario')
    }
  }
  @Put('restar')
  @HttpCode(201)
  parametrosCuerpo(
      @Body() parametrosCuerpo,
      @Req () req,
      @Res () res){
    const validarUsuario = req.cookies['usuario']
    if (validarUsuario) {
      const numero1 = Number(parametrosCuerpo.numero1)
      const numero2 = Number(parametrosCuerpo.numero2)
      const resta = numero1 - numero2;
      const puntos = req.signedCookies['puntos']
      const nuevosPuntos = (Number(puntos) - Math.abs(resta));
      if (numero1 && numero2) {
        if (Number(nuevosPuntos) <= 0) {
          res.cookie('puntos', '100', {signed: true});
          const mensaje = {
            Resta: resta,
            Puntos: String(req.cookies['usuario']).concat(", se acabaron tus puntos, se han restablecido en 100")
          }
          res.send(mensaje)
        }else {
          res.cookie('puntos', nuevosPuntos, {signed: true});
          const mensaje = {
            Resta: resta,
            Puntos: nuevosPuntos
          }
          res.send(mensaje)
        }
        return 'Datos invalidos'
      }
    }
    else{
      throw new BadRequestException('Registre un usuario')
    }

  }
  @Delete('multiplicar')
  @HttpCode(200)
  cabecera( @Headers() cabecera,
            @Req() req,
            @Res() res){
    const validarUsuario = req.cookies['usuario']
    if (validarUsuario) {
      const numero1 = Number(cabecera.numero1)
      const numero2 = Number(cabecera.numero2)
      const multi = numero1 * numero2;
      const puntos = req.signedCookies['puntos']
      const nuevosPuntos = (Number(puntos) - Math.abs(multi));
      if (numero1 && numero2) {
        if (Number(nuevosPuntos) <= 0) {
          res.cookie('puntos', '100', {signed: true});
          const mensaje = {
            Multiplicacion: multi,
            Puntos: String(req.cookies['usuario']).concat(", se acabaron tus puntos, se han restablecido en 100")
          }
          res.send(mensaje)
        }else {
          res.cookie('puntos', nuevosPuntos, {signed: true});
          const mensaje = {
            Multiplicacion: multi,
            Puntos: nuevosPuntos
          }
          res.send(mensaje);
        }
        return ' '
      }
    }else{
      throw new BadRequestException('Registre un usuario')
    }
  }
  @Post('dividir/numero1/:numero1/numero2/:numero2')
  @HttpCode(201)
  parametrosRuta( @Param () parametrosRuta,@Req () req,@Res() res){
    const numero1 = Number(parametrosRuta.numero1)
    const numero2 = Number(parametrosRuta.numero2)
    const validarUsuario = req.cookies['usuario']
    if (validarUsuario) {
      if (numero2 == 0){
        throw new BadRequestException('No se puede hacer una division para cero')
      }
      else{
        if (numero1 && numero2){
          const division = numero1/numero2
          const puntos = req.signedCookies['puntos']
          const nuevosPuntos = (Number(puntos) - Math.abs(division));
          if (Number(nuevosPuntos) <= 0) {
            res.cookie('puntos', '100', {signed: true});
            const mensaje = {
              Division: division,
              Puntos: String(req.cookies['usuario']).concat(", se acabaron tus puntos, se han restablecido en 100")
            }
            res.send(mensaje)
          }else {
            res.cookie('puntos', nuevosPuntos, {signed: true});
            const mensaje = {
              Division: division,
              Puntos: nuevosPuntos
            }
            res.send(mensaje);
          }
        }
        return 'Existe un cero en la segunda variable'
      }
    }else{
      throw new BadRequestException('Registre un usuario')
    }
    }

}
