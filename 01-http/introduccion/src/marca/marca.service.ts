import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
import {MarcaEntity} from "./marca.entity";
@Injectable()
export class MarcaService{
    constructor(
        @InjectRepository(MarcaEntity)
        private repository:Repository<MarcaEntity>
    ) {}
    crearUno(marca:MarcaEntity){
        return this.repository.save(marca)
    }
    buscarTodos(textoConsulta?:string){
        let consulta: FindManyOptions<MarcaEntity> = {};
        if(textoConsulta){
            consulta= {
                where: [
                    {
                        marca: Like(`%${textoConsulta}%`)
                    },
                    {
                        modelo: Like(`%${textoConsulta}%`)
                    }
                ]
            }
        }
        return this.repository.find(consulta);
    }
    buscarUno(id: number){
        return this.repository.findOne(id);
    }

    editarUno(marca: MarcaEntity){
        return this.repository.save(marca);
    }

    eliminarUno(id: number){
        return this.repository.delete(id);
    }
}
