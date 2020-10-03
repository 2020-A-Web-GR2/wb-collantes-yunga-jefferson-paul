import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DomainEntity } from './domain.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DomainService {
    constructor(
        @InjectRepository(DomainEntity)
        private repository: Repository<DomainEntity>
    ){}

    createOne(newDomain: DomainEntity){
        return this.repository.save(newDomain);
    }

    findOne(id: number){
        return this.repository.findOne(id);
    }

    updateOne(updatedDomain: DomainEntity){
        return this.repository.save(updatedDomain);
    }
}