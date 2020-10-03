import { Controller, Get, HttpCode, Param, InternalServerErrorException, Post, Body, BadRequestException, Put } from '@nestjs/common';
import { FactoryService } from '../factory/factory.service';
import { RolCreateDto } from './dto/rol.create.dto';
import { ValidationError, validate } from 'class-validator';
import { RolEntity } from './rol.entity';
import { RolUpdateDto } from './dto/rol.update.drto';
import { RolService } from './rol.service';

@Controller("rol")
export class RolController {
    constructor(
        private readonly rolService: RolService
    ){}
    
    @Get(":id")
    @HttpCode(200)
    async findRol(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.rolService.findOne(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error");
        }
    }

    @Post()
    @HttpCode(201)
    async addRol(
        @Body() bodyParams
    ){
        // Validator
        const rolCreateDto = new  RolCreateDto();
        // Data
        rolCreateDto.name = bodyParams.name;
        rolCreateDto.description = bodyParams.description;
        try {
            // Validation
            const errors: ValidationError[] = await validate(rolCreateDto);
            if(errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Error in fields");
            } else {
                // Create instance
                const newRol = new RolEntity();
                newRol.name = rolCreateDto.name;
                newRol.description = rolCreateDto.description;
                // Send to DB
                const response = await this.rolService.createOne(newRol);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Rol not registered")
        }
    }

    @Put(":id")
    @HttpCode(201)
    async updateRol(
        @Param() pathParams,
        @Body() bodyParams
    ){
        //Validator
        const rolUpdateDto= new RolUpdateDto();
        // Data
        rolUpdateDto.id = Number(pathParams.id);
        rolUpdateDto.name = bodyParams.name;
        rolUpdateDto.description = bodyParams.description;
        try {
            // Validation
            const errors: ValidationError[] = await validate(rolUpdateDto);
            if (errors.length > 0) {
                console.log(errors);
                throw new BadRequestException("Errors in fields");
            } else {
                // Create instance
                const updateRol = new RolEntity();
                updateRol.id = rolUpdateDto.id;
                updateRol.name = rolUpdateDto.name;
                updateRol.description = rolUpdateDto.description;
                //Send to DB
                const response = await this.rolService.updateOne(updateRol);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error");
        }
    }
}