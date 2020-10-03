import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Rol")
export class RolEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: "Identifier",
        name: "idRol"
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

    // TODO: UserRol
}