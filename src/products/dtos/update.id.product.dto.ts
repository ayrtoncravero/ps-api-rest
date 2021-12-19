import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class UpdateIdProductDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del producto.',
        type: Number,
    })
    @IsInt()
    id: number;
}