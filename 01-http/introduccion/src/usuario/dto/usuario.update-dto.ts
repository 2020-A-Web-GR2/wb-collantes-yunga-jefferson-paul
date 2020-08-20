import {
    IsAlpha,
    IsDate,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    Length
} from "class-validator";
export class UsuarioUpdateDto{
    @Length(10,10)
    @IsNumber()
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
    @IsDate()
    @IsNotEmpty()
    fecha_nacimiento: Date
    @IsDateString()
    @IsNotEmpty()
    fecha_hora_nacimiento: string
}