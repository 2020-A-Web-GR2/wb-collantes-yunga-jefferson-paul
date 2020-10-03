import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CategoryEntity } from '../category/category.entity';


@Entity("Domain")
export class DomainEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idDomain"
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
        type => CategoryEntity,
        category => category.domain
    )
    categories: CategoryEntity[];

}