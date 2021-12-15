import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        example: 1,
        description: 'Identificador unico del producto.',
        type: Number,
    })
    id: number;

    @Column()
    @ApiProperty({
        example: 'remera verano azul',
        description: 'Representa el nombre del producto.',
        type: String,
    })
    name: string;

    @Column()
    @ApiProperty({
        example: 1000,
        description: 'Representa el precio del producto.',
        type: Number,
    })
    price: number;

    @Column()
    @ApiProperty({
        example: 'remera-verano-azul.png',
        description: 'Representa la imagen del producto',
        type: String,
    })
    image: string;

    @Column()
    @ApiProperty({
        example: 'l',
        description: 'Representa el talle del producto.',
        type: String,
    })
    size: string;
}