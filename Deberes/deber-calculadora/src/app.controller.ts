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

    //console.log('Usuario:',req.cookies['usuario'])
    console.log('Se ha creado la cookie para: ', req.cookies['usuario']);
    res.send({
      mensaje: 'Guardado correctamente'
    });

  }
  //http://localhost:3000/deber-calculadora/sumar
  @Get('sumar')
  @HttpCode(200)
  parametrosConsulta(
      @Query() parametrosDeConsulta,
      @Req() req){
    const validarUsuario = req.cookies['usuario']
    if (validarUsuario){
      const numero1 = Number(parametrosDeConsulta.numero1)
      const numero2 = Number(parametrosDeConsulta.numero2)
      const suma = numero1+numero2
      if (numero1 && numero2){
        console.log('Numeros Sumados',suma);
        return suma;
      }
      return 'datos invalidos';
    }
    else{
      throw new BadRequestException('Registre un usuario')
    }

  }
  @Put('restar')
  @HttpCode(201)
  parametrosCuerpo(
      @Body() parametrosCuerpo,
      @Req () req){
    const validarUsuario = req.cookies['usuario']
    if (validarUsuario) {
      const numero1 = Number(parametrosCuerpo.numero1)
      const numero2 = Number(parametrosCuerpo.numero2)
      const resta = numero1 - numero2;
      if (numero1 && numero2){
        console.log('Numeros Restados',resta);
        return resta;
      }
      return 'Datos invalidos'
    }
    else{
      throw new BadRequestException('Registre un usuario')
    }

  }
  @Delete('multiplicar')
  @HttpCode(200)
  cabecera( @Headers() cabecera,
            @Req() req){
    const validarUsuario = req.cookies['usuario']
    if (validarUsuario) {
      const numero1 = Number(cabecera.numero1)
      const numero2 = Number(cabecera.numero2)
      const multi = numero1 * numero2;
      if (numero1&& numero2){
        console.log('Numeros Multiplicaados', multi)
      }
      return ' '
    }
    else{
      throw new BadRequestException('Registre un usuario')
    }
  }
  @Post('dividir')
  @HttpCode(201)
  parametrosRuta( @Param () parametrosRuta,@Req () req){
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
          console.log('La division es',division)
        }
        return 'Existe un cero'
      }
    }
    else{
      throw new BadRequestException('Registre un usuario')
    }
    }


}
