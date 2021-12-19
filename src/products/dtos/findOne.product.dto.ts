import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class FindOneDto {
    @ApiProperty({
        example: 1,
        description: 'Representa un identificador unico del producto.',
        type: Number,
    })
    @IsInt()
    id: Number
}