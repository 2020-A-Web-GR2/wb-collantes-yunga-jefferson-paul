import { Module } from "@nestjs/common";
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity], "default")
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ]
})
export class UserModule {


}