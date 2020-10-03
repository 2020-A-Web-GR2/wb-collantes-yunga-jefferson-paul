import { IsNotEmpty, IsInt, IsPositive, IsNumber, Min } from "class-validator";

export class BillDetailCreateDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    total: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    idBill: number;
    
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    idProduct: number;

}