import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm/index';
import { BillEntity } from './bill.entity';


@Injectable()
export class BillService {
    constructor(
        @InjectRepository(BillEntity)
        private repository: Repository<BillEntity>
    ){}
    createOne(newBill: BillEntity){
        return this.repository.save(newBill);
    }

    findOne(id: number){
        return this.repository.findOne(id);
    }

    updateOne(updatedBill: BillEntity){
        return this.repository.save(updatedBill);
    }

    findAllByUser(id: number){
        return this.repository.find({where: [
                {user: {id: id}}
            ]})
    }

}