import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillEntity } from './bill.entity';
import { BillService } from './bill.service';
import { BillController } from "./bill.controller";
import { BillDetailModule } from '../bill-detail/bill-detail.module';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [
        BillDetailModule,
        ProductModule,
        TypeOrmModule.forFeature([BillEntity], "default")
    ],
    controllers:[
        BillController
    ],
    providers: [
        BillService
    ]
})
export class BillModule {

}