import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsPositive,
} from "class-validator";
export class MarcaCreateDto {
    @IsNotEmpty()
    @IsString()
    marca: string
    @IsNotEmpty()
    @IsString()
    modelo: string
    @IsNotEmpty()
    @IsNumber()
    anio: number
    @IsNotEmpty()
    @IsNumber()
    cilindraje: number
    @IsNotEmpty()
    @IsString()
    pais_origen: string

}