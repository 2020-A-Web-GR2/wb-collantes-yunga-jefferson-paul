import { IsNotEmpty, IsEmail, Length, IsOptional, IsUrl, IsNumber, Min, IsArray, ArrayNotEmpty, IsInt } from "class-validator";

export class UserCreateDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(10, 30)
    password: string;

    @IsNotEmpty()
    @Length(3, 30)
    userName: string;

    @IsNotEmpty()
    @Length(3, 30)
    firstName: string;

    @IsNotEmpty()
    @Length(3, 30)
    lastName: string;
    
    @IsNumber()
    @Min(0)
    money: number;
    
    @IsOptional()
    @Length(10)
    phone?: string;

    @IsOptional()
    @IsUrl()
    @Length(3, 150)
    srcImage?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({each: true})
    @Min(0, {each: true})
    idsRol: number[];
}