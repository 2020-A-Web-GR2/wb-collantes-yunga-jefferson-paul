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
  BadRequestException
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('deber-calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('sumar')
  @HttpCode(200)
  parametrosConsulta(@Query() parametrosDeConsulta){
    const numero1 = Number(parametrosDeConsulta.numero1)
    const numero2 = Number(parametrosDeConsulta.numero2)
    const suma = numero1+numero2
    if (numero1 && numero2){
      console.log('Numeros Sumados',suma);
      return suma;
    }
    return 'datos invalidos';
  }
  @Put('restar')
  @HttpCode(201)
  parametrosCuerpo(@Body() parametrosCuerpo){
    const numero1 = Number(parametrosCuerpo.numero1)
    const numero2 = Number(parametrosCuerpo.numero2)
    const resta = numero1 - numero2;
    if (numero1 && numero2){
      console.log('Numeros Restados',resta);
      return resta;
    }
    return 'Datos invalidos'
  }
  @Delete('multiplicacion')
  @HttpCode(200)
  cabecera( @Headers() cabecera){
    const numero1 = Number(cabecera.numero1)
    const numero2 = Number(cabecera.numero2)
    const multi = numero1 * numero2;
    if (numero1&& numero2){
      console.log('Numeros Multiplicaados', multi)
    }
    return ' '
  }
  @Post('division')
  @HttpCode(201)
  parametrosRuta( @Param () parametrosRuta){
    const numero1 = Number(parametrosRuta.numero1)
    const numero2 = Number(parametrosRuta.numero2)

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

}
