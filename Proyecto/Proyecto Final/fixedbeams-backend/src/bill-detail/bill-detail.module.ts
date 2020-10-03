import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillDetailEntity } from './bill-detail.entity';
import { BillDetailController } from './bill-detail.controller';
import { BillDetailService } from './bill-detail.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BillDetailEntity], "default")
    ],
    controllers: [
        BillDetailController
    ],
    providers: [
        BillDetailService
    ],
    exports: [
        BillDetailService
    ]
})
export class BillDetailModule {
    
}