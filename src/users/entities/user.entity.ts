import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del usuario.',
        type: Number,
    })
    id: number;

    @Column()
    @ApiProperty({
        example: 'pepito',
        description: 'Representa el nombre del usuario.',
        type: String,
    })
    name: string;

    @Column()
    @ApiProperty({
        example: 'perez',
        description: 'Representa el apellido del usuario.',
        type: String,
    })
    surname: string;

    @Column()
    @ApiProperty({
        example: 'pepito@example.com',
        description: 'Representa el correo electronico del usuario.',
        type: String,
    })
    email: string;
}