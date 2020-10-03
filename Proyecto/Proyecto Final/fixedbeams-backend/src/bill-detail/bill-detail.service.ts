import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BillDetailEntity } from './bill-detail.entity';
import { Repository } from 'typeorm/index';

@Injectable()
export class BillDetailService{
    constructor(
        @InjectRepository(BillDetailEntity)
        private repository: Repository<BillDetailEntity>
    ){}

    createOne(newBillDetail){
        return this.repository.save(newBillDetail);
    }

    findOne(id: number){
        return this.repository.findOne(id);
    }

    updateOne(updatedBillDetail){
        return this.repository.save(updatedBillDetail);
    }
}