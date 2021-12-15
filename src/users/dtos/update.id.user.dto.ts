import { ApiProperty } from "@nestjs/swagger";

export class UpdateIdUserDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del usuario.',
        type: Number,
    })
    id: Number;
}