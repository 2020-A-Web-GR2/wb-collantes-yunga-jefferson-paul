import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException, NotFoundException,
    Param,
    Post,
    Put, Query, Res
} from '@nestjs/common';
import {UsuarioService} from "./usuario.service";
import {MascotaService} from "../mascota/mascota.service";
import {tryCatch} from "rxjs/internal-compatibility";
import {ok} from "assert";
import {UsuarioEntity} from "./usuario.entity";

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
    async inicio(
        @Res() res,
        @Query() parametrosConsulta
    ) {
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
            res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }


    }

    @Get('vista/login')
    login(
        @Res() res
    ) {

        res.render('usuario/login')
    }

    @Get('vista/crear') // Controlador
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            }
        )
    }
    @Get('vista/editar/:id') // Controlador
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param () parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado;
        try{
            usuarioEncontrado = await this._usuarioService.buscarUno(id);
        }catch (error) {
            console.error('Error del servidor')
            return res.redirect("/usuario/vista/inicio?mensaje=Erro al buscar el usuario")
        }
        if (usuarioEncontrado){
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario:usuarioEncontrado

                }
            )
        }else{
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado')
        }

    }

    @Post('crearDesdeVista')
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        // Validar los datos con un rico DTO
        let nombreApellidoConsulta;
        let cedulaConsulta;
        if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
            nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
            if (parametrosCuerpo.cedula.length === 10) {
                cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
            } else {
                const mensajeError = 'Cedula incorrecta'
                return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
            }
        } else {
            const mensajeError = 'Enviar cedula(10) nombre y apellido'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError)
        }
        let respuestaCreacionUsuario;
        try {
            respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
        } catch (error) {
            console.error(error);
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
        }
        if (respuestaCreacionUsuario) {
            return res.redirect('/usuario/vista/inicio');
        } else {
            const mensajeError = 'Error creando usuario'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
        }
    }
    
    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }
    }
    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res
    ) {
        const usuarioEditado = {
            id:Number(parametrosRuta.id),
            nombre:parametrosCuerpo.nombre,
            apellido:parametrosCuerpo.apellido,
            //cedula:parametrosCuerpo.cedula

        }as UsuarioEntity;
        try {
            await this._usuarioService.editarUno(usuarioEditado)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario')
        }
    }





}