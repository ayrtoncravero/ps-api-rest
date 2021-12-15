import { ApiProperty } from "@nestjs/swagger";

export class FindOneUserDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del usuario.',
        type: Number,
    })
    id: Number
}