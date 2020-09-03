import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Res
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import {tryCatch} from "rxjs/internal-compatibility";

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
        private readonly _usuarioService:UsuarioService,
        private readonly _mascotaService:MascotaService,
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
    @Post('crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ) {
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota
        // Validar Usuario
        // Valodar Mascota
        let usuarioCreado;
        try {
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({
                mensaje: 'Error creando usuario',
            })
        }
        if (usuarioCreado) {
            mascota.usuario = usuarioCreado.id;
            let mascotaCreada;
            try {
                mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);
            } catch (e) {
                console.error(e);
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
            if (mascotaCreada) {
                return {
                    mascota: mascotaCreada,
                    usuario: usuarioCreado
                }
            } else {
                throw new InternalServerErrorException({
                    mensaje: 'Error creando mascota',
                })
            }
        } else {
            throw new InternalServerErrorException({
                mensaje: 'Error creando mascota',
            })
        }


    }
    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ) {
        const nombreControlador = 'Jefferson';
        res.render(
            'usuario/ejemplo', // Nombre de la vista (archivo)
            { // Parametros de la vista
                nombre: nombreControlador,
            })
    }

    @Get('vista/faq')
    faq(
        @Res() res
    ) {

        res.render('usuario/faq')
    }

    @Get('vista/inicio')
    inicio(
        @Res() res
    ) {

        res.render('usuario/inicio')
    }

    @Get('vista/login')
    login(
        @Res() res
    ) {

        res.render('usuario/login')
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