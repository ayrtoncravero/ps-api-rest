import { ApiProperty } from "@nestjs/swagger";

export class UpdateIdProductDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del producto.',
        type: Number,
    })
    id: number;
}