import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @ManyToOne(
        type => UsuarioEntity,
            usuario => usuario.mascotas)
    usuario:UsuarioEntity;

    @OneToMany(
        type => VacunaEntity, vacuna => vacuna.mascota
    )
    vacunas:VacunaEntity[];


}