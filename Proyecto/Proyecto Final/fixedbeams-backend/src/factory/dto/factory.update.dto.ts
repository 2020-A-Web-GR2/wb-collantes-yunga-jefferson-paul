import { IsNotEmpty, IsInt, Min, IsOptional, Length } from 'class-validator';

export class FactoryUpdateDto {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    id: number;

    @IsOptional()
    @IsNotEmpty()
    @Length(3, 45)
    name?: string;
    
    @IsOptional()
    @IsNotEmpty()
    @Length(3, 150)
    description?: string;
}