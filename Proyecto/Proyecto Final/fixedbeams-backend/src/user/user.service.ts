import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from './user.entity';
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ){}

    createOne(newUser: UserEntity){
        return this.repository.save(newUser);
    }

    findOne(email: string, password: string){
        return this.repository.findOne({email: email, password: password});
    }

    findOneID(id: number){
        return this.repository.findOne(id);
    }
    editOne( editedUser: UserEntity){
        return this.repository.save(editedUser);
    }
    
}