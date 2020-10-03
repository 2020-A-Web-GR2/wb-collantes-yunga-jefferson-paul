import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { type } from "os";
import { CategoryEntity } from '../category/category.entity';
import { FactoryEntity } from "src/factory/factory.entity";
import { BillDetailEntity } from '../bill-detail/bill-detail.entity';

@Entity("Product")
export class ProductEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idProduct"
    })
    id: number;
    
    @Column({
        name: "name",
        type: "varchar",
        length: 45,
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        name: "summary",
        type: "varchar",
        length: 150,
        nullable: false
    })
    summary: string;

    @Column({
        name: "price",
        type: "decimal",
        precision: 10, 
        scale: 2,
        nullable: false,
    })
    price: number;
    
    @Column({
        name: "stock",
        type: "int",
        nullable:false
    })
    stock: number;

    @Column({
        name: "srcImage",
        type:"varchar",
        length: 150,
        nullable: false
    })
    srcImage: string;

    @ManyToOne(
        type => CategoryEntity,
        category => category.products
    )
    @JoinColumn({ name: "idCategory" })
    category: CategoryEntity;

    @ManyToOne(
        type => FactoryEntity,
        factory => factory.products
    )
    @JoinColumn({ name: "idFactory" })
    factory: FactoryEntity;

    @OneToMany(
        type => BillDetailEntity,
        billDetail => billDetail.product
    )
    billDetails: BillDetailEntity[];

}