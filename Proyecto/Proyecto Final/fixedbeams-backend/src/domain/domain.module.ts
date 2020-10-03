import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainEntity } from './domain.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
    imports: [
        CategoryModule,
        TypeOrmModule.forFeature([DomainEntity], "default")
    ],
    controllers: [
        DomainController
    ],
    providers: [
        DomainService
    ]
})
export class DomainModule {

}