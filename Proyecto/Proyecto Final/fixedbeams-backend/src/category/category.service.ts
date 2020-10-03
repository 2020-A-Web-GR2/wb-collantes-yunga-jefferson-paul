import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from './category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private repository: Repository<CategoryEntity>
    ){}

    createOne(newCategory: CategoryEntity){
        return this.repository.save(newCategory);
    }

    findOne(id: number){
        return this.repository.findOne(id);
    }

    updateOne(updateCategory: CategoryEntity){
        return this.repository.save(updateCategory);
    }

    findAllByDomain(id: number){
        return this.repository.find({where: [
            {domain: id}
        ]})
    }

}