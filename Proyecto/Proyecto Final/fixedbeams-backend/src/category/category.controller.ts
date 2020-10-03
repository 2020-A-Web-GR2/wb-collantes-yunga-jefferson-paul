import { Controller, Get, HttpCode, Param, InternalServerErrorException, Post, Body, BadRequestException, ParseIntPipe, Put, Res, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category.create.dto';
import { ValidationError, validate } from 'class-validator';
import { CategoryEntity } from './category.entity';
import { DomainEntity } from 'src/domain/domain.entity';
import { CategoryUpdateDto } from './dto/category.update.dto';
import { ProductService } from '../product/product.service';
import { obtenerCarritoUsuario } from '../shared/shared.functions';


@Controller("category")
export class CategoryController {
    
    constructor(
        private readonly categoryService: CategoryService,
        private readonly productService :ProductService){}

    @Get(":id")
    @HttpCode(200)
    async findCategory(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.categoryService.findOne(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException({message: "SErver error"});
        }
    }

    @Post()
    @HttpCode(201)
    async addCategory(
        @Body() bodyParams
    ){
        // Validator
        const categoryCreateDto = new CategoryCreateDto();
        // Data
        categoryCreateDto.name = bodyParams.name;
        categoryCreateDto.description = bodyParams.description;
        categoryCreateDto.srcImage = bodyParams.srcImage;
        categoryCreateDto.idDomain = bodyParams.idDomain;
        try {
            const errors: ValidationError[] = await validate(categoryCreateDto);
            if (errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Errors in fields");
            } else {
                // Create instance
                const newCategory = new CategoryEntity();
                newCategory.name = categoryCreateDto.name;
                newCategory.description = categoryCreateDto.description;
                newCategory.srcImage = categoryCreateDto.srcImage;
                newCategory.domain = new DomainEntity();
                newCategory.domain.id = categoryCreateDto.idDomain;
                // Send to DB
                const response = await this.categoryService.createOne(newCategory);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Category not register");
        }
    }

    @Put(":id")
    async updateCategory(
        @Param() pathParams,
        @Body() bodyParams
    ){
        // Validator
        const categoryUpdateDto = new CategoryUpdateDto();
        // Data
        categoryUpdateDto.id = Number(pathParams.id);
        categoryUpdateDto.name = bodyParams.name;
        categoryUpdateDto.description = bodyParams.description;
        categoryUpdateDto.srcImage = bodyParams.srcImage;
        try {
            const errors: ValidationError[] = await validate(categoryUpdateDto);
            if (errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Errors in fields");
            } else {
                // Create instance
                const updateCategory = new CategoryEntity();
                updateCategory.id = categoryUpdateDto.id;
                updateCategory.name = categoryUpdateDto.name;
                updateCategory.description = categoryUpdateDto.description;
                updateCategory.srcImage = categoryUpdateDto.srcImage;
                // Send to DB
                const response = await this.categoryService.updateOne(updateCategory);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Error updating")
        }
    }
    
    @Get("products/:id")
    @HttpCode(200)
    async findCategoryProducts(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.productService.findAllByCategory(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Internal Server error");
        }
    }

    @Get("view/:id")
    async sendCategoryView(
        @Param() pathParams,
        @Res() res,
        @Req() req
    ){
        const user = req.cookies.user;
        const productosCarrito = obtenerCarritoUsuario(req);
        const id = Number(pathParams.id);
        try {
            const category: CategoryEntity = await this.categoryService.findOne(id);
            const categoryName = category.name;
            const categoryProducts = await this.productService.findAllByCategory(id);
            if(categoryProducts && categoryName){
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "product-cards",
                        categoryName: categoryName,
                        categoryProducts: categoryProducts,
                        products: productosCarrito,
                        user: user
                    }
                );
            } else if (!categoryName) {
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "search", 
                        mensaje: "Categoria no encontrada", 
                        products: productosCarrito,
                        user: user
                    }
                );
            } else if (!categoryProducts) {
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "search", 
                        mensaje: "Productos no encontrados",
                        user: user
                    }
                );
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Internal Server error");
        }
    }

}