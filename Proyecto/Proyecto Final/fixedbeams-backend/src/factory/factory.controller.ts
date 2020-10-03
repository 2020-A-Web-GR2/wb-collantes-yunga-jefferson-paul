import { Controller, Get, HttpCode, Param, InternalServerErrorException, Post, Body, BadRequestException, Put } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { FactoryCreateDto } from './dto/factory.create.dto';
import { ValidationError, validate } from 'class-validator';
import { FactoryEntity } from './factory.entity';
import { FactoryUpdateDto } from './dto/factory.update.dto';

@Controller("factory")
export class FactoryController {
    constructor(
        private readonly factoryService: FactoryService
    ){}

    @Get(":id")
    @HttpCode(200)
    async findFactory(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.factoryService.findOne(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error");
        }
    }

    @Post()
    @HttpCode(201)
    async addFactory(
        @Body() bodyParams
    ){
        // Validator
        const factoryCreateDto = new FactoryCreateDto();
        // Data
        factoryCreateDto.name = bodyParams.name;
        factoryCreateDto.description = bodyParams.description;
        try {
            // Validation
            const errors: ValidationError[] = await validate(factoryCreateDto);
            if (errors.length > 0) {
                console.log(errors);
                throw new BadRequestException("Errors in fileds");
            } else {
                // Create instance
                const newFactory = new FactoryEntity();
                newFactory.name = factoryCreateDto.name;
                newFactory.description = factoryCreateDto.description;
                // Send to DB
                const response =this.factoryService.createOne(newFactory);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Factory not register");
        }
    }

    @Put(":id")
    @HttpCode(201)
    async updateFactory(
        @Param() pathParams,
        @Body() bodyParams
    ){
        // Validator
        const factoryUpdateDto = new FactoryUpdateDto();
        // Data
        factoryUpdateDto.id = Number(pathParams.id);
        factoryUpdateDto.name = bodyParams.name;
        factoryUpdateDto.description = bodyParams.description;
        try {
            // Validation
            const errors: ValidationError[] = await validate(factoryUpdateDto);
            if(errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Errors iun fields");
            } else {
                // Create Instance
                const updateFactory = new FactoryEntity();
                updateFactory.id = factoryUpdateDto.id;
                updateFactory.name = factoryUpdateDto.name;
                updateFactory.description = factoryUpdateDto.description;
                // send to DB
                const response = await this.factoryService.updateOne(updateFactory);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Error updating");
        }
    }
}