import { Min, IsInt, IsNotEmpty, IsOptional, IsPositive, IsNumber } from "class-validator";

export class BillDetailUpdateDto{
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    quantity: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    unitPrice: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    total: number;
}