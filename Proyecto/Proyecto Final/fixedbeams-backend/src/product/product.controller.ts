import { Controller, Get, HttpCode, Param, InternalServerErrorException, Post, Body, BadRequestException, Put, Res, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto } from './dto/product.create.dto';
import { ValidationError, validate } from 'class-validator';
import { ProductEntity } from './product.entity';
import { CategoryEntity } from '../category/category.entity';
import { FactoryEntity } from 'src/factory/factory.entity';
import { ProductUpdateDto } from './dto/product.update.dto';
import { obtenerCarritoUsuario } from '../shared/shared.functions';


@Controller("product")
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}

    @Get()
    @HttpCode(200)
    async findQueryProduct(
        @Query() queryParams
    ){
        const productoBuscar = queryParams.productoBuscar;
        if(productoBuscar){
            try {
                const response = await this.productService.findAllByQuery(productoBuscar);
                return response;
            } catch (error) {
                console.log(error);
                throw new InternalServerErrorException("Server error");
            }
        } else{
            throw new BadRequestException("Error en consulta");
        }
    }

    @Get(":id")
    @HttpCode(200)
    async findProduct(
        @Param() pathParams
    ){
        const id = Number(pathParams.id);
        try {
            const response = await this.productService.findOne(id);
            return response;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error");
        }
    }

    @Post()
    @HttpCode(201)
    async addProduct(
        @Body() bodyParams
    ){
        // Validator
        const productCreateDto = new ProductCreateDto();
        // Data
        productCreateDto.name = bodyParams.name;
        productCreateDto.summary = bodyParams.summary;
        productCreateDto.stock = bodyParams.stock;
        productCreateDto.price = bodyParams.price;
        productCreateDto.srcImage = bodyParams.srcImage;
        productCreateDto.idCategory = bodyParams.idCategory;
        productCreateDto.idFactory = bodyParams.idFactory;
        try {
            // Validation
            const errors: ValidationError[] = await validate(productCreateDto);
            if(errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Erors in fields");
            } else {
                // Create instance
                const newProduct = new ProductEntity();
                newProduct.name = productCreateDto.name;
                newProduct.summary = productCreateDto.summary;
                newProduct.price = productCreateDto.price;
                newProduct.stock = productCreateDto.stock;
                newProduct.srcImage = productCreateDto.srcImage;
                const category = new CategoryEntity();
                category.id = productCreateDto.idCategory;
                newProduct.category = category;
                const factory = new FactoryEntity();
                factory.id = productCreateDto.idFactory;
                newProduct.factory = factory;
                // Send to DB
                const response = await this.productService.createOne(newProduct);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error")
        }
    }

    @Put(":id")
    @HttpCode(201)
    async updateProduct(
        @Param() pathParams,
        @Body() bodyParams
    ){
        // Validator
        const productUpdateDto = new ProductUpdateDto();
        // Data
        productUpdateDto.id = Number(pathParams.id);
        productUpdateDto.name = bodyParams.name;
        productUpdateDto.summary = bodyParams.summary;
        productUpdateDto.price = bodyParams.price;
        productUpdateDto.stock = bodyParams.stock;
        productUpdateDto.srcImage = bodyParams.srcImage;
        productUpdateDto.idCategory = bodyParams.idCategory;
        productUpdateDto.idFactory = bodyParams.idFactory;
        try {
            // Validation
            const errors: ValidationError[] = await validate(productUpdateDto);
            if(errors.length > 0){
                console.log(errors);
                throw new BadRequestException("Erors in fields");
            } else {
                // Create instance
                const updatedProduct = new ProductEntity();
                updatedProduct.id = productUpdateDto.id;
                updatedProduct.name = productUpdateDto.name;
                updatedProduct.summary = productUpdateDto.summary;
                updatedProduct.price = productUpdateDto.price;
                updatedProduct.stock = productUpdateDto.stock;
                updatedProduct.srcImage = productUpdateDto.srcImage;
                const category = new CategoryEntity();
                category.id = productUpdateDto.idCategory;
                updatedProduct.category = category;
                const factory = new FactoryEntity();
                factory.id = productUpdateDto.idFactory;
                updatedProduct.factory = factory;
                // Send to DB
                const response = await this.productService.updateOne(updatedProduct);
                // Send response
                return response;
            }
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Server error")
        }
    }

    @Get("view/search")
    async sendProductView(
        @Query() queryParams,
        @Res() res,
        @Req() req
    ){
        const user = req.cookies.user;
        const productosCarrito = obtenerCarritoUsuario(req);
        const searchProduct = queryParams.searchProduct;  
        if(searchProduct){
            try {
                const searchProducts = await this.productService.findAllByQuery(searchProduct);
                if(searchProducts){
                    return res.render(
                        "app/app-component", 
                        {
                            pagina: "product-cards",
                            categoryName: searchProduct,
                            categoryProducts: searchProducts.slice(0,4),
                            products: productosCarrito,
                            user: user
                        }
                    );
                } else {
                    return res.render(
                        "app/app-component", 
                        {
                            pagina: "search", 
                            mensaje: "No se encontraron productos",
                            products: productosCarrito,
                            user: user
                        }
                    );
                }
            } catch (error) {
                console.log(error);
                throw new InternalServerErrorException("Server error");
            }
        } else{
            throw new BadRequestException("Error en consulta");
        }
    }

    @Get("view/borrar/carrito")
    inicio(
        @Res() res,
        @Req() req,
    ){
        const user = req.cookies.user;
        const productosCarrito = [];
        res.cookie("carrito", productosCarrito);
        return res.render(
            "app/app-component", 
            {
                pagina: "search", 
                products: productosCarrito, 
                user: user
            }
        );
    } 
    
    @Get("view/:id")
    async sendProductViewById(
        @Param() pathParams,
        @Req() req,
        @Res() res
    ){
        const user = req.cookies.user;
        let cantidad = 0;
        let productosCarrito = req.cookies.carrito;
        const id = Number(pathParams.id);
        try {
            const product = await this.productService.findOne(id);
            if(product){
                if(productosCarrito){
                    let productoExistente = productosCarrito.find((productoCarrito) => productoCarrito.id == product.id);
                    if(productoExistente){
                        cantidad = productoExistente.quantity;
                    }
                }
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "product", 
                        product: product, 
                        cantidad: cantidad,
                        products: productosCarrito,
                        user: user
                    }
                );
            } else {
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "search", 
                        mensaje: "Producto no encontrado",
                        products: productosCarrito,
                        user: user
                    }
                );
            }
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Internal Server Error");
        }
    }

    @Get("/:id/:cantidad")
    async guardarEnCarrito(
        @Param() pathParams,
        @Res() res,
        @Req() req
    ){
        const user = req.cookies.user;
        let productosCarrito = req.cookies.carrito;
        
        if(!productosCarrito){
            productosCarrito = [];    
        }
        const id = Number(pathParams.id);
        const cantidad = Number(pathParams.cantidad);
        if(id == NaN || cantidad === NaN){
            return res.render(
                "app/app-component", 
                {
                    pagina: "search", 
                    mensaje: "Error en guardar producto",
                    products: productosCarrito,
                    user: user
                }
            );
        }
        try {
            const product: ProductEntity = await this.productService.findOne(id);
            if (product){
                const productoAgregado = {
                    id: id,
                    name: product.name,
                    price: product.price,
                    srcImage: product.srcImage,
                    quantity: cantidad,
                    user: user
                };
                productosCarrito = this.guardarProducto(productoAgregado, productosCarrito);
                res.cookie(
                    "carrito", productosCarrito
                );
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "search", 
                        products: productosCarrito,
                        user: user
                    }
                );
            } else {
                return res.render(
                    "app/app-component", 
                    {
                        pagina: "search", 
                        mensaje: "Error producto no existe",
                        products: productosCarrito,
                        user: user
                    }
                );
            }

        } catch (error) {
            console.log(error);
            throw new BadRequestException("Internal Server Error");
        }
    }


    guardarProducto(producto, productosCarrito){
        let productoExistente = productosCarrito.find((productoCarrito) => productoCarrito.id == producto.id);
        if(productoExistente){
            if(producto.quantity <= 0){
                const index = productosCarrito.indexOf(productoExistente);
                productosCarrito.splice(index, 1);
            } else {
                productoExistente.quantity = producto.quantity;
            }
        } else {
          productosCarrito.push(producto);
        }
        return productosCarrito;
      }
}
