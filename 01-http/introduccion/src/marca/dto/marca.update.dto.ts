import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsPositive, IsInt, Min,
} from "class-validator";
export class MarcaUpdateDto {

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;

    @IsNotEmpty()
    @IsString()
    marca: string;

    @IsNotEmpty()
    @IsString()
    modelo: string;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    anio: number;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    cilindraje: number;

    @IsNotEmpty()
    @IsString()
    pais_origen: string
}