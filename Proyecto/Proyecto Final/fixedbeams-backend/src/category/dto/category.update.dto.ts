import { IsNotEmpty, IsInt, Min, Length, IsUrl, IsOptional } from "class-validator";


export class CategoryUpdateDto {
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

    @IsOptional()
    @IsNotEmpty()
    @Length(3, 150)
    @IsUrl()
    srcImage?: string;
}