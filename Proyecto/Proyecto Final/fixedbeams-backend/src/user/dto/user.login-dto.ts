import { IsNotEmpty, IsEmail, Length } from "class-validator";

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @Length(10, 30)
    password: string;
}