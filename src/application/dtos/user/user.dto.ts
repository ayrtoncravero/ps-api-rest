import { ApiProperty } from "@nestjs/swagger"; 

export class UserDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del usuario.',
        type: Number,
    })
    id: number;

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
    surName: string;
    
    @ApiProperty({
        example: 'pepito@example.com',
        description: 'Representa el correo electronico del usuario.',
        type: String,
    })
    email: string;
}