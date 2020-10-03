import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from './category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { ProductModule } from "src/product/product.module";

@Module({
    imports: [
        ProductModule,
        TypeOrmModule.forFeature([CategoryEntity], "default")
    ],
    controllers: [
        CategoryController
    ],
    providers: [
        CategoryService
    ],
    exports: [
        CategoryService
    ]
})
export class CategoryModule {
    
}