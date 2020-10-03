import { Controller, Get, Param, InternalServerErrorException, Post, HttpCode, Body, BadRequestException, Put, Res, Req } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainCreateDto } from './dto/domain.create.dto';
import { ValidationError, validate } from 'class-validator';
import { DomainUpdaeDto } from './dto/domain.update.dto';
import { DomainEntity } from './domain.entity';
import { CategoryService } from '../category/category.service';
import { obtenerCarritoUsuario } from '../shared/shared.functions';

@Controller("domain")
export class DomainController {
    constructor(
        private readonly domainService: DomainService,
        private readonly categoryService: CategoryService
    ){}

    @Get(":id")
    @HttpCode(200)
    async findDomain(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.domainService.findOne(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "Server error"});
        }
    }

    @Post()
    @HttpCode(201)
    async addDomain(
        @Body() bodyParams
    ){
        // Validator
        const domainCreateDto = new DomainCreateDto();
        //Data
        domainCreateDto.name = bodyParams.name;
        domainCreateDto.description = bodyParams.description;
        try {
            // Validation
            const errors: ValidationError[] = await validate(domainCreateDto);
            if(errors.length > 0) {
                console.log(errors);
                throw new BadRequestException("Error in fields");
            } else {
                // Create instance
                const newDomain = new DomainEntity();
                newDomain.name = domainCreateDto.name;
                newDomain.description = domainCreateDto.description;
                // Send to DB
                const response = this.domainService.createOne(newDomain);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Domain not registered");
        }
    }

    @Put(":id")
    @HttpCode(201)
    async updateDomain(
        @Param() pathParams,
        @Body() bodyParams
    ){
        // Validator
        const domainUpdaeDto = new DomainUpdaeDto();
        // Data
        domainUpdaeDto.id = Number(pathParams.id);
        domainUpdaeDto.name = bodyParams.name;
        domainUpdaeDto.description = bodyParams.description;
        try {
            // validate
            const errors: ValidationError[] = await validate(domainUpdaeDto);
            if (errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Errors in fields")
            } else{
                // Create instance
                const updateDomain = new DomainEntity();
                updateDomain.id = domainUpdaeDto.id;
                updateDomain.name = domainUpdaeDto.name;
                updateDomain.description = domainUpdaeDto.description;
                // Send to DB
                const response = await this.domainService.updateOne(updateDomain);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Error Updating");
        }
    }

    @Get("categories/:id")
    @HttpCode(200)
    async findDomainCategories(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.categoryService.findAllByDomain(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Internal Server Error")
        }

    }

    @Get("view/:id")
    async sendDomainView(
        @Param() pathParams,
        @Res() res,
        @Req() req
    ){
        const user = req.cookies.user;
        const productosCarrito = obtenerCarritoUsuario(req);
        const id = Number(pathParams.id);
        try {
            const domainCategories = await this.categoryService.findAllByDomain(id);
            if(domainCategories){
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "category-cards", 
                        domainCategories: domainCategories,
                        products: productosCarrito,
                        user: user
                    }
                );
            } else {
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "search", 
                        mensaje: "Categorias no encontradas",
                        products: productosCarrito,
                        user: user
                    }
                );
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Internal Server Error")
        }
    }

}