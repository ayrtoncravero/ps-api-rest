import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        example: 'pepito',
        description: 'Representa el nombre del usuario.',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'perez',
        description: 'Representa el apellido del usuario.',
        type: String,
    })
    @IsString()
    surname: string;

    @ApiProperty({
        example: 'pepito@example.com',
        description: 'Representa el correo electronico del usuario.',
        type: String,
    })
    @IsEmail()
    email: string;
}