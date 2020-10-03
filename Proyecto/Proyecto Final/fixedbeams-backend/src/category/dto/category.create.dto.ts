import { IsNotEmpty, Length, IsUrl, IsInt, Min } from "class-validator";

export class CategoryCreateDto {
    @IsNotEmpty()
    @Length(3, 45)
    name: string;

    @IsNotEmpty()
    @Length(3, 150)
    description: string;

    @IsNotEmpty()
    @Length(3, 150)
    @IsUrl()
    srcImage: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    idDomain;
}