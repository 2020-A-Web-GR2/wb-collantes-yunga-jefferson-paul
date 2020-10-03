import { Length, IsNotEmpty } from "class-validator";

export class FactoryCreateDto {
    @IsNotEmpty()
    @Length(3, 45)
    name: string;
    
    @IsNotEmpty()
    @Length(3, 150)
    description: string;

}