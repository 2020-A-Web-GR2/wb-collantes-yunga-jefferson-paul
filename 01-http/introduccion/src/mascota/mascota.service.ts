import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MascotaEntity} from "./mascota.entity";
import {Repository} from "typeorm";

@Injectable()
export class MascotaService {
    constructor(
        @InjectRepository(MascotaEntity)
        private repository: Repository<MascotaEntity>
    ) {
    }
    crearNuevaMascota(mascota:MascotaEntity){
        return this.repository.save(mascota)
    }
}