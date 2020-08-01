import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";


@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' // Nombre de los propiedades no de las tablas
])
@Index(['nombre','apellido','cedula'],{unique:true})

@Entity('db_usuario')// sera el nombre de la tabla de datos
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned:true, // para que sean solo numeros positivos
        comment: 'Identificador',
        name : 'id'
    })
    id:number;

    @Column({
        name:'nombre',
        type:'varchar',
        nullable: true
    })
    nombre? : string;

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?: string;

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula: string;

    @Column({
        name : 'sueldo',
        nullable : true,
        type:'decimal',
        precision:10, //10000000000
        scale:4 //.0000
    })
    sueldo?:number;

    @Column({
        nullable:true,
        type: 'date',
        name:'fecha_nacimiento'
    })
    fechaNacimiento?:string;

    @Column({
        nullable:true,
        type: 'datetime',
        name:'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?:string;

}