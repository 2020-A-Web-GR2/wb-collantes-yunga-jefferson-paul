import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";

@Module({
    controllers:[UsuarioController],
    imports:[],
    providers:[UsuarioService]
})
export class UsuarioModule{

}