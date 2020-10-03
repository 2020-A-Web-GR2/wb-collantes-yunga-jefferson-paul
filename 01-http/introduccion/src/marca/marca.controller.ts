import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query, Res, Session } from "@nestjs/common";
import {MarcaService} from "./marca.service";
import { validate, ValidationError } from 'class-validator';
import {MarcaCreateDto} from "./dto/marca.create.dto";
import {MarcaUpdateDto} from "./dto/marca.update.dto";
import {MarcaEntity} from "./marca.entity";

@Controller("marca")

export class MarcaController{
    constructor(private readonly marcaService:MarcaService){}
    @Get()
    async mostrarTodos(){
        try {
            const respuesta = await this.marcaService.buscarTodos();
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Marca no encontrada"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({mensaje: "Error del servidor"});
        }
    }

    @Get(":id")
    async verUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            const respuesta = this.marcaService.buscarUno(id);
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        const marcaCreateDto = this.asignarValidadorCrear(parametrosCuerpo);

        try {
            const errores: ValidationError[] =  await validate(marcaCreateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {
                const nuevaMarca = this.crearInstanciaNueva(marcaCreateDto);
                // Enviar a base de datos
                const respuesta = await this.marcaService.crearUno(nuevaMarca);
                if(respuesta){
                    return  respuesta;
                } else {
                    throw new InternalServerErrorException({message: "Registro no encontrado"});
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Put(":id")
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id = Number(parametrosRuta.id);
        // Validador
        const marcaUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores: ValidationError[] = await validate(marcaUpdateDto);
            if(errores.length > 0){
                console.log(errores);
                throw new BadRequestException({mensaje: "Error en los campos"});
            } else {

                const actualizarMarca = this.crearInstanciaActualizar(marcaUpdateDto);
                // Enviar a la base de datos
                const respuesta = await this.marcaService.editarUno(actualizarMarca);
                if(respuesta){
                    return  respuesta;
                } else {
                    throw new InternalServerErrorException({message: "Registro no encontrado"});
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Delete(":id")
    async eliminarUno(
        @Param() parametrosRuta
    ){
        const id = Number(parametrosRuta.id);
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            const respuesta = await this.marcaService.eliminarUno(id);
            if(respuesta){
                return  respuesta;
            } else {
                throw new InternalServerErrorException({message: "Registro no encontrado"});
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }


    @Get("vista/inicio")
    async inicio(
        @Res() res,
        @Query() parametrosConsulta,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        let resultadoEncontrado;
        try {
            resultadoEncontrado = await this.marcaService.buscarTodos(parametrosConsulta.busqueda);
        } catch (error) {
            console.log("Error: ", error);
            throw new InternalServerErrorException("Error encontrando marcas")
        }
        if(resultadoEncontrado){
            return res.render("marca/inicio",
                {
                    arregloMarcas: resultadoEncontrado,
                    parametrosConsulta: parametrosConsulta
                }
            )
        } else {
            throw new NotFoundException("No se encontraron marcas")
        }
    }

    @Get('vista/crear')
    crearMarcaVista(
        @Query() parametrosConsulta,
        @Res() res,
        @Session() session
    ) {
        if(!session.usuario){
            return res.redirect("/login");
        }
        return res.render(
            'marca/crear',
            {
                error: parametrosConsulta.error,
                marca: parametrosConsulta.marca,
                modelo: parametrosConsulta.modelo,
                anio: parametrosConsulta.anio,
                cilindraje: parametrosConsulta.cilindraje,
                pais_origen: parametrosConsulta.pais_origen
            }
        )
    }

    @Get("vista/editar/:id")
    async editarMarcaVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        let marcaEncontrada;
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        try {
            marcaEncontrada = await this.marcaService.buscarUno(id);
        } catch(error){
            console.log(error);
            return res.redirect("/marca/vista/inicio?mensaje=Error buscando marca");
        }
        if(marcaEncontrada){
            return res.render(
                'marca/crear',
                {
                    error: parametrosConsulta.error,
                    marca: marcaEncontrada
                }
            )
        } else {
            return res.redirect("/marca/vista/inicio?mensaje=Marca no encontrada");
        }
    }

    @Post("crearDesdeVista")
    async crearDesdeVista(
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        let camposError;
        // Validador
        const marcaCreateDto = this.asignarValidadorCrear(parametrosCuerpo);
        try {
            const errores: ValidationError[] = await validate(marcaCreateDto);
            if(errores.length > 0){
                console.log(errores);

                const mensajeError = 'Error en campos'
                camposError = `&marca=${marcaCreateDto.marca}&modelo=${marcaCreateDto.modelo}&anio=${marcaCreateDto.anio}&cilindraje=${marcaCreateDto.cilindraje}&pais_origen=${marcaCreateDto.pais_origen}`;

                return res.redirect('/marca/vista/crear?error=' + mensajeError + camposError);
            } else {
                const nuevaMarca = this.crearInstanciaNueva(marcaCreateDto);
                let respuestaCreacionMarca = await this.marcaService.crearUno(nuevaMarca);
                if(respuestaCreacionMarca){
                    return res.redirect('/marca/vista/inicio');
                } else{
                    const mensajeError = 'Error creando marca'
                    return res.redirect('/marca/vista/crear?error=' + mensajeError + camposError);
                }
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Error del servidor"});
        }
    }

    @Post("editarDesdeVista/:id")
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        const id = Number(parametrosRuta.id);
        // Validador
        const marcaUpdateDto = this.asignarValidadorActualizar(parametrosCuerpo, id);
        try {
            const errores: ValidationError[] = await validate(marcaUpdateDto);
            if(errores.length > 0){
                console.log(errores);

                const mensajeError = 'Error en campos'
                const camposError = `&marca=${marcaUpdateDto.marca}&modelo=${marcaUpdateDto.modelo}&anio=${marcaUpdateDto.anio}&cilindraje=${marcaUpdateDto.cilindraje}&pais_origen=${marcaUpdateDto.pais_origen}`;
                return res.redirect('/marca/vista/crear?error=' + mensajeError + camposError);
            } else {

                const actualizarMarca = this.crearInstanciaActualizar(marcaUpdateDto);
                await this.marcaService.editarUno(actualizarMarca);
                return res.redirect("/marca/vista/inicio?mensaje=Auto editado");
            }
        } catch (error) {
            console.log(error);
            return res.redirect("/marca/vista/inicio?mensaje=Error eliminando marca");
        }
    }

    @Post("vista/eliminar/:id")
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res,
        @Session() session
    ){
        if(!session.usuario){
            return res.redirect("/login");
        }
        try {
            const id = Number(parametrosRuta.id);
            await this.marcaService.eliminarUno(id);
            return res.redirect("/marca/vista/inicio?mensaje=Usuario eliminado");
        } catch (error) {
            console.log(error);
            return res.redirect("/marca/vista/inicio?mensaje=Error eliminando marca");
        }
    }


    asignarValidadorCrear(parametrosCuerpo): MarcaCreateDto{
        const marcaCreateDto = new MarcaCreateDto();
        // Datos
        marcaCreateDto.marca = parametrosCuerpo.marca
        marcaCreateDto.modelo = parametrosCuerpo.modelo;
        marcaCreateDto.anio = Number(parametrosCuerpo.anio);
        marcaCreateDto.cilindraje = Number(parametrosCuerpo.cilindraje);
        marcaCreateDto.pais_origen = parametrosCuerpo.pais_origen;

        return marcaCreateDto;
    }

    asignarValidadorActualizar(parametrosCuerpo, id): MarcaUpdateDto{
        if(id === NaN || id === null){
            throw new BadRequestException({mensaje: "Error en ruta"});
        }
        const marcaUpdateDto = new MarcaUpdateDto();
        // Datos
        marcaUpdateDto.id = id;
        marcaUpdateDto.marca = parametrosCuerpo.marca;
        marcaUpdateDto.modelo = parametrosCuerpo.modelo;
        marcaUpdateDto.anio = Number(parametrosCuerpo.anio);
        marcaUpdateDto.cilindraje=Number(parametrosCuerpo.cilindraje);
        marcaUpdateDto.pais_origen = parametrosCuerpo.pais_origen;
        return marcaUpdateDto;
    }

    crearInstanciaNueva(marcaCreateDto: MarcaCreateDto): MarcaEntity{
        // Crear nueva instancia
        const nuevaMarca = new MarcaEntity();
        nuevaMarca.marca = marcaCreateDto.marca;
        nuevaMarca.modelo = marcaCreateDto.modelo;
        nuevaMarca.anio = marcaCreateDto.anio;
        nuevaMarca.cilindraje = marcaCreateDto.cilindraje;
        nuevaMarca.pais_origen = marcaCreateDto.pais_origen;


        return nuevaMarca;
    }

    crearInstanciaActualizar(marcaUpdateDto: MarcaUpdateDto): MarcaEntity{

        const actualizarMarca = new MarcaEntity();
        actualizarMarca.id = marcaUpdateDto.id;
        actualizarMarca.marca = marcaUpdateDto.marca;
        actualizarMarca.modelo = marcaUpdateDto.modelo;
        actualizarMarca.anio = marcaUpdateDto.anio;
        actualizarMarca.cilindraje=marcaUpdateDto.cilindraje
        actualizarMarca.pais_origen = marcaUpdateDto.pais_origen;
        return actualizarMarca;
    }
}