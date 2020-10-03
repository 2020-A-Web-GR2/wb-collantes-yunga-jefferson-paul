import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FactoryEntity } from './factory.entity';
import { FactoryController } from "./factory.controller";
import { FactoryService } from "./factory.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([FactoryEntity], "default")
    ],
    controllers: [
        FactoryController
    ],
    providers: [
        FactoryService
    ]
})
export class FactoryModule {
    
}