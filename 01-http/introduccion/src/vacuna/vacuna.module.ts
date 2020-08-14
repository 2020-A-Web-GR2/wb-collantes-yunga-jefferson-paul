import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {VacunaEntity} from "./vacuna.entity";



@Module({
    controllers:[],
    imports:[
        TypeOrmModule
            .forFeature(
                [
                    VacunaEntity
                ],
                'default'
            )
    ],
    providers:[]
})
export class VacunaModule{

}