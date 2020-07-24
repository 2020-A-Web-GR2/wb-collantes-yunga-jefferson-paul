import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";

@Module({
    controllers:[UsuarioController],
    imports:[
        TypeOrmModule
            .forFeature(
                [
        UsuarioEntity
    ],
        'default'
    )
    ],
    providers:[UsuarioService]
})
export class UsuarioModule{

}