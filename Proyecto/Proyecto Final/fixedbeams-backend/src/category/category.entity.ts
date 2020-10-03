import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { DomainEntity } from '../domain/domain.entity';
import { type } from "os";
import { ProductEntity } from '../product/product.entity';


@Entity("Category")
export class CategoryEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idCategory"
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

    @Column({
        name: "srcImage",
        type:"varchar",
        length: 150,
        nullable: false
    })
    srcImage: string;

    @ManyToOne(
        type => DomainEntity,
        domain => domain.categories
    )
    @JoinColumn({ name: "idDomain" })
    domain: DomainEntity;

    @OneToMany(
        type => ProductEntity,
        product => product.category
    )
    products: ProductEntity[];

}