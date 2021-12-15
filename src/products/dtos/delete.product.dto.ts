import { ApiProperty } from "@nestjs/swagger";

export class DeleteProductDto {
    @ApiProperty({
        example: 1,
        description: 'Representa un identificador unico del producto.',
        type: Number,
    })
    id: Number
}