
import {Controller, Get, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { obtenerCarritoUsuario } from './shared/shared.functions';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  inicio(
    @Res() res,
    @Req() req
  ){
    const user = req.cookies.user;
    const productosCarrito = obtenerCarritoUsuario(req);
    return res.render(
      "app/app-component", 
      {
        pagina: "search", 
        products: productosCarrito,
        user: user
      }
    );
  }

  @Get('login')
  login(
      @Res() response
  ){
    return response.render('login/login')
  }
  
}

/*
  @Post("login")
  async loginPost(
      @Body() parametrosCuerpo,
      @Res() res,

  ){

    const usuario = this.autenticarUsuario(parametrosCuerpo);
    if(usuario){
      return res.redirect("domain/categories/1");
    } else {
      return res.render(
          "login/login",
          {error: "El usuario o la contraseña no coinciden"}
      );
    }
  }

  autenticarUsuario(parametrosCuerpo): boolean{
    const email = parametrosCuerpo.email;
    const password = parametrosCuerpo.password;
    if(email == "francis.ferri@epn.edu.ec" && password == "0123456789"){
      return true;
    }
    return false;
  }
*/