import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(ProductEntity)
        private repository: Repository<ProductEntity> 
    ){}

    createOne(newProduct: ProductEntity){
        return this.repository.save(newProduct);
    }

    findOne(id: number){
        return this.repository.findOne(id);
    }

    updateOne(updatedProduct: ProductEntity){
        return this.repository.save(updatedProduct);
    }

    findAllByCategory(id: number){
        return this.repository.find({where: [
            {category: id}
        ]})
    }

    findAllByQuery(queryText: String){
        const consulta: FindManyOptions<ProductEntity> = {
            where: [{name: Like(`%${queryText}%`) }]
        }
        return this.repository.find(consulta);
    }
}