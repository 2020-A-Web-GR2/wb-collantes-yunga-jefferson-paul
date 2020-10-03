import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm';

@Index([
    'marca',
    'modelo',
    'anio',
    'cilindraje',
    'pais_origen'
])


@Entity('db_marca')

export class MarcaEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: "id_marca"
    })
    id: number;

    @Column({
        name: "marca",
        type: "varchar",
        length: 45,
        nullable: false,
    })
    marca: string;
    @Column({
        name: "modelo",
        type: "varchar",
        length: 45,
        nullable: false,
    })
    modelo: string;

    @Column({
        name: 'anio',
        type: 'int',
        nullable: true,
    })
    anio?: number

    @Column({
        name: 'cilindraje',
        type: 'int',
        nullable: true,
    })
    cilindraje?: number

    @Column({
        name: "pais_origen",
        type: "varchar",
        length: 45,
        nullable: false
    })
    pais_origen: string;

}