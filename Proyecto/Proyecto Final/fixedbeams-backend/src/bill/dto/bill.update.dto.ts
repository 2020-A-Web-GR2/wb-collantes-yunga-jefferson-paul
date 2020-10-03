import { IsNotEmpty, IsIn, IsOptional, IsNumber, IsInt, Min } from "class-validator";


export class BillUpdateDto{
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(["cash", "credit card", "wire transfer"])
    paymentType?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    longitude?: number;
    

}