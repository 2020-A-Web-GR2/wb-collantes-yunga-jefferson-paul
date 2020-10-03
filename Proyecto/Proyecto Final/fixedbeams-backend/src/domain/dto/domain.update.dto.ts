import { IsOptional, IsNotEmpty, Length, IsInt, Min } from "class-validator";

export class DomainUpdaeDto {
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