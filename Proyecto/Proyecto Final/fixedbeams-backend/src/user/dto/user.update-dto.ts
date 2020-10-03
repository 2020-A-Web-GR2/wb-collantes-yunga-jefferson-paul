import { IsNotEmpty, Length, IsOptional, IsUrl, IsNumber, IsPositive, Min, IsInt, IsArray, ArrayNotEmpty } from "class-validator";

export class UserUpdateDto {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;
    
    @IsOptional()
    @IsNotEmpty()
    @Length(10, 30)
    password?: string;

    @IsOptional()
    @IsNotEmpty()
    @Length(3, 30)
    firstName?: string;

    @IsOptional()
    @IsNotEmpty()
    @Length(3, 30)
    lastName?: string;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    money?: number;

    @IsOptional()
    @Length(10)
    phone?: string;

    @IsOptional()
    @IsUrl()
    srcImage?: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({each: true})
    @Min(0, {each: true})
    idsRol?: number[];
}