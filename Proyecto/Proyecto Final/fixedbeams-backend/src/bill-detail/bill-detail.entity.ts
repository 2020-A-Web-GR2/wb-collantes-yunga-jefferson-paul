import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { type } from 'os';
import { BillEntity } from '../bill/bill.entity';
import { ProductEntity } from '../product/product.entity';

@Entity("BillDetail")
export class BillDetailEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idDetail"
    })
    id: number;

    @Column({
        name: "quantity",
        type: "int",
        nullable: false
    })
    quantity: number;

    @Column({
        name: "unitPrice",
        type: "decimal",
        precision: 10, 
        scale: 2,
        nullable: false,
    })
    unitPrice: number;

    @Column({
        name: "total",
        type: "decimal",
        precision: 10, 
        scale: 2,
        nullable: false,
    })
    total: number;

    @ManyToOne(
        type => BillEntity,
        bill => bill.billDetails
    )
    @JoinColumn({name: "idBill"})
    bill: BillEntity;

    @ManyToOne(
        type => ProductEntity,
        product => product.billDetails
    )
    @JoinColumn({name: "idProduct"})
    product: ProductEntity;


}