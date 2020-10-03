import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FactoryEntity } from './factory.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FactoryService {
    constructor(
        @InjectRepository(FactoryEntity)
        private repository: Repository<FactoryEntity>
    ){}

    createOne(newFactory: FactoryEntity){
        return this.repository.save(newFactory);
    }

    findOne(id: number){
        return this.repository.findOne(id);
    }

    updateOne(updatedFactory: FactoryEntity){
        return this.repository.save(updatedFactory);
    }
}