import { ApiProperty } from "@nestjs/swagger"; 
import { IsInt, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        example: 'remera verano azul',
        description: 'Representa el nombre del producto.',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 1000,
        description: 'Representa el precio del producto.',
        type: Number,
    })
    @IsInt()
    price: number;

    @ApiProperty({
        example: 'remera-verano-azul.png',
        description: 'Representa la imagen del producto',
        type: String,
    })
    @IsString()
    image: string;

    @ApiProperty({
        example: 'l',
        description: 'Representa el talle del producto.',
        type: String,
    })
    @IsString()
    size: string;
}