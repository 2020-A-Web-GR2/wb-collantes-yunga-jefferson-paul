import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductEntity } from '../product/product.entity';


@Entity("Factory")
export class FactoryEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idFactory"
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
        name: "description",
        type: "varchar",
        length: 150,
        nullable: false
    })
    description: string;

    @OneToMany(
        type => ProductEntity,
        product => product.factory
    )
    products: ProductEntity[];

    // TODO: products
}