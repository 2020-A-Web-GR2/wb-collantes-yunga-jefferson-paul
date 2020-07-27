import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';

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

    @Get()
    mostrarTodos() {
        return this.arregloUsuarios
    }
// para utilizar un json
    @Post()
    crearUno(
        @Body() parametrosCuerpo
    ) {
        const nuevoUsuario = {
            id: this.idActual + 1,
            nombre: parametrosCuerpo.nombre
        };
        this.arregloUsuarios.push(nuevoUsuario);
        this.idActual = this.idActual + 1;
        return nuevoUsuario;
    }

    @Get(':id')
    verUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(
            // (usuario) => usuario.id === Number(parametrosRuta.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        return this.arregloUsuarios[indice];

    }
    //http://localhost:3001/usuario/1
    @Put(':id')
    editarUno(
        @Param() parametrosRuta,
        @Body () parametrosCuerpo
    ){
        const indice = this.arregloUsuarios.findIndex(
            // (usuario) => usuario.id === Number(parametrosRuta.id)
            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuarios[indice].nombre = parametrosCuerpo.nombre
        return this.arregloUsuarios[indice];

    }
    @Delete(':id')
    eliminarUno(
        @Param() parametrosRuta
    ){
        const indice = this.arregloUsuarios.findIndex(

            (usuario) => usuario.id === Number(parametrosRuta.id)
        )
        this.arregloUsuarios.splice(indice,1);
        return this.arregloUsuarios[indice];

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