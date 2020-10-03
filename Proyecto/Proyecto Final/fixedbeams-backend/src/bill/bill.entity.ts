import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { type } from "os";
import { UserEntity } from '../user/user.entity';
import { BillDetailEntity } from '../bill-detail/bill-detail.entity';


@Entity("Bill")
export class BillEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idBill"
    })
    id: number;

    @Column({
        name: "paymentType",
        type: "varchar",
        nullable: false,
        length: 45
    })
    paymentType: string;

    @Column({
        name: "total",
        type: "decimal",
        precision: 10, 
        scale: 2,
        nullable: false,
    })
    total: number;

    @Column({
        name: "dateTime",
        type: "timestamp",
        nullable: false
    })
    dateTime: Date;
    
    @Column({
        name: "latitude",
        type: "decimal",
        precision: 10, 
        scale: 6,
        nullable: false
    })
    latitude: number;

    @Column({
        name: "longitude",
        type: "decimal",
        precision: 10, 
        scale: 6,
        nullable: false
    })
    longitude: number;

    @ManyToOne(
        type => UserEntity,
        user => user.bills
    )
    @JoinColumn({ name: "idUser" })
    user: UserEntity;

    @OneToMany(
        type => BillDetailEntity,
        billDetail => billDetail.bill
    )
    billDetails: BillDetailEntity[];
    
}