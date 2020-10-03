import { IsNotEmpty, IsIn, Min, IsDate, IsNumber, isNotEmpty, IsInt } from 'class-validator';

export class BillCreateDto {
    @IsNotEmpty()
    @IsIn(["cash", "credit card", "wire transfer"])
    paymentType: string;
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    total: number;

    @IsNotEmpty()
    @IsDate()
    dateTime: Date;

    @IsNotEmpty()
    @IsNumber()
    latitude: number;

    @IsNotEmpty()
    @IsNumber()
    longitude: number;
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    idUser: number;
}