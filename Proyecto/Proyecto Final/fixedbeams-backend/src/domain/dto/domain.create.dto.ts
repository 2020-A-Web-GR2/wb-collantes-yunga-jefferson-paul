import { IsNotEmpty, Length } from "class-validator";

export class DomainCreateDto {
    @IsNotEmpty()
    @Length(3, 45)
    name: string;
    
    @IsNotEmpty()
    @Length(3, 150)
    description: string;
    
}