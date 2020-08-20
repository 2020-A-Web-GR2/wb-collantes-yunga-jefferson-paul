import {
    IsAlpha,
    IsDate,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    Length
} from "class-validator";
export class UsuarioCreateDto{
    @Length(0,10)
    @IsNotEmpty()
    cedula: string;
    @IsNotEmpty()
    @IsAlpha()
    nombre: string;
    @IsNotEmpty()
    @IsAlpha()
    apellido: string
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    sueldo: number
    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: Date
    @IsDateString()
    @IsNotEmpty()
    fecha_hora_nacimiento: string
}