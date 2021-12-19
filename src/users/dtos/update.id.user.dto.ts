import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class UpdateIdUserDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del usuario.',
        type: Number,
    })
    @IsInt()
    id: Number;
}