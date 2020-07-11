import {
    IsAlpha, IsBoolean,
    IsEmpty,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

//@IsAlpha(nombre,a-zA-Z)
//@IsNotEmpty()
//@MinLength()
//@MaxLength()
//@IsBoolean()
//@IsEmpty()
//@IsPositive()
//@IsOptional()
//@IsNumber()
export class MascotaCreateDto{
    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre:string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad:number;

    @IsNotEmpty()
    @IsBoolean()
    casada:boolean;

    @IsOptional()
    @IsBoolean()
    ligada?:boolean;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    peso:number;// no importa que sea decimal se lo reconoce como un number




}