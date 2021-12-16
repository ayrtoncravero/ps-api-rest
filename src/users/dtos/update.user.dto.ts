import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({
        example: 'pepito',
        description: 'Representa el nombre del usuario.',
        type: String,
    })
    name: string;

    @ApiProperty({
        example: 'perez',
        description: 'Representa el apellido del usuario.',
        type: String,
    })
    surname: string;

    @ApiProperty({
        example: 'pepito@example.com',
        description: 'Representa el correo electronico del usuario.',
        type: String,
    })
    email: string;
}