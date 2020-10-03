import { Entity, Index, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { BillEntity } from '../bill/bill.entity';
import { RolEntity } from '../rol/rol.entity';

@Index([ "firstName", "lastName"])
@Index(["email", "userName"], {unique: true})
@Entity("User")
export class UserEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idUser"
    })
    id: number;

    @Column({
        name: "email",
        type: "varchar",
        nullable: false,
        unique: true,
        length: 50
    })
    email: string;

    @Column({
        name: "password",
        type: "varchar",
        nullable: false,
        length: 30
    })
    password: string;

    @Column({
        name: "userName",
        type: "varchar",
        nullable: false,
        unique: true,
        length: 50
    })
    userName: string;

    @Column({
        name: "firstName",
        type: "varchar",
        nullable: false,
        length: 50
    })
    firstName: string;

    @Column({
        name: "lastName",
        type: "varchar",
        nullable: false,
        length: 50
    })
    lastName: string;

    @Column({
        name: "money",
        type: "decimal",
        precision: 10,
        scale:2,
        nullable: false
    })
    money: number;

    @Column({
        name: "phone",
        type:"varchar",
        nullable: true,
        length: 15
    })
    phone?: string;


    @Column({
        name: "srcImage",
        type: "varchar",
        nullable: true,
        length: 150
    })
    srcImage?: string;

    @OneToMany(
        type => BillEntity,
        bill => bill.user
    )
    bills: BillEntity[];

    @ManyToMany(
        type => RolEntity,
        {cascade: true}
    )
    @JoinTable({
        name: "UserRol",
        joinColumn: {name: "idUser", referencedColumnName: "id"},
        inverseJoinColumn: {name: "idRol", referencedColumnName: "id"}
    })
    rols: RolEntity[];
}
