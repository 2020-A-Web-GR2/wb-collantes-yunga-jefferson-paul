import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolEntity } from './rol.entity';
import { Repository } from 'typeorm';


@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private repository: Repository<RolEntity>
    ){}

    createOne(newRol : RolEntity){
        return this.repository.save(newRol);
    }

    findOne(id: number){
        return this.repository.findOne(id);
    }

    updateOne(updatedRol: RolEntity){
        return this.repository.save(updatedRol);
    }
}