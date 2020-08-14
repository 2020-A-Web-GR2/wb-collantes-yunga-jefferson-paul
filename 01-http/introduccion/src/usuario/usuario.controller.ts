import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";

@Controller('usuario')
export class UsuarioController {
    public arregloUsuarios = [
        {
            id: 1,
            nombre: 'Jefferson'
        },
        {
            id: 2,
            nombre: 'Paul'
        },
        {
            id: 3,
            nombre: 'Martin'
        }
    ]
    public idActual = 3;

    constructor(//inyeccio de dependencias
        private readonly _usuarioService:UsuarioService
    ) {
    }

    @Get()
    async mostrarTodos() {
        try{
            const respuesta = await this._usuarioService.buscarTodos();
            return respuesta;

        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error en el servidor'
            })
        }
        //return this.arregloUsuarios
    }
// para utilizar un json
    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ) {
        try{
            //Validacion de los DTO
            const respuesta = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta
        }
        catch (e) {
            console.error(e)
            throw new BadRequestException({
                mensaje:'Error al validar los datos'
            });
        }
        //const nuevoUsuario = {
        //    id: this.idActual + 1,
        //    nombre: parametrosCuerpo.nombre
        //};
        //this.arregloUsuarios.push(nuevoUsuario);
        //this.idActual = this.idActual + 1;
        //return nuevoUsuario;
    }

    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        let respuesta;
        try{
            respuesta = await this._usuarioService.buscarUno(Number(parametrosRuta.id));

        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error en el servidor'
            })
        }
        if (respuesta){
            return respuesta;
        }else{
            throw new NotFoundException({
                mensaje:'No existen registros'
            })
        }
        
        //const indice = this.arregloUsuarios.findIndex(
            // (usuario) => usuario.id === Number(parametrosRuta.id)
        //    (usuario) => usuario.id === Number(parametrosRuta.id)
        //)
        //return this.arregloUsuarios[indice];

    }
    //http://localhost:3001/usuario/1
    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body () parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        const usuarioEditado = parametrosCuerpo;
        usuarioEditado.id = id;

        try{
            const  respuesta = await this._usuarioService.editarUno(usuarioEditado);
            return respuesta;

        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error en el servidor'
            })
        }
        //const indice = this.arregloUsuarios.findIndex(
            // (usuario) => usuario.id === Number(parametrosRuta.id)
        //    (usuario) => usuario.id === Number(parametrosRuta.id)
        //)
        //this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre
        //return this.arregloUsuarios[indice];

    }
    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id)
        try {
            const respuesta = await this._usuarioService.eliminarUno(id);
            return{
                mensaje:'registro eliminado con id = '+id
            };
        }catch (e) {
            console.error(e)
            throw new InternalServerErrorException({
                mensaje:'Error en el servidor'
            })
        }

        //const indice = this.arregloUsuarios.findIndex(

        //            (usuario) => usuario.id === Number(parametrosRuta.id)
        //)
        //this.arregloUsuarios.splice(indice,1);
        //return this.arregloUsuarios[indice];

    }


    // XML <usuario><nombre>ADRIAN</nombre></usuario>
    // JSON {"nombre":"ADRIAN"}
    // RESTful - JSON
    // http://localhost:3001/
    // RESTFUL MASCOTA
    // Ver Todos
    // GET http://localhost:3001/mascota
    // Ver Uno
    // GET http://localhost:3001/mascota/1
    // Crear Uno
    // POST http://localhost:3001/mascota (BODY) {"nombre":"cachetes"}
    // Editar Uno
    // PUT http://localhost:3001/mascota/1 (BODY) {"nombre":"panda"}
    // Eliminar Uno
    // DELETE http://localhost:3001/mascota/1

}