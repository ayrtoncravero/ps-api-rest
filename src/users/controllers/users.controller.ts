import { Body, Controller, Get, Post, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { 
    ApiTags,
    ApiResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiBadRequestResponse,
    ApiBody,
} from '@nestjs/swagger';
import { User } from '../entities/user.entity';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(
        private UserService: UsersService
    ) {};

    @Get()
    @ApiOperation({
        summary: 'Obtiene todos los usuarios.'
    })
    @ApiResponse({
        status: 200,
        description: 'Una lista con todos los usuarios.',
        type: User,
    })
    getAll() {
        try {
            return this.UserService.findAll();
        } catch(error) {
            return `${error}`;
        };
    }

    @Post() 
    @HttpCode(201)
    @ApiOperation({
        summary: 'Crear un usuario.',
    })
    @ApiResponse({
        status: 201,
        description: 'El usuario fue creado correctamente.',
    })
    @ApiBadRequestResponse({
        description: 'El usuario no pudo ser creado.',
    })
    @ApiCreatedResponse({
        description: 'El usuario fue creado correctamente',
        type: User,
    })
    @ApiBody({
        type: User,
    })
    create(@Body() body: any) {
        try {
            return this.UserService.create(body);    
        } catch(error) {
            return `${error}`;
        };
    };

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Obtiene un usuario por id.',
    })
    @ApiResponse({
        status: 200,
        description: 'Usuario encontrado.',
        type: User,
    })
    @ApiBadRequestResponse({
        description: 'El usuario no pudo encontrarse.'
    })
    getOne(@Param('id') id: number) {
        try {
            return this.UserService.findOne(id);
        } catch(error) {
            return `${error}`;
        };
    };

    @Put(':id')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Actualizacion de usuario.'
    })
    @ApiResponse({
        status: 200,
        description: 'El usuario se actualizo correctamente.',
    })
    @ApiBadRequestResponse({
        description: 'No se pudo encontrar el producto.',
    })
    @ApiBody({
        type: User,
    })
    update(@Param('id') id: number, @Body() body: any) {
        try {
            return this.UserService.update(id, body);
        } catch(error) {
            return `${error}`;
        }
    };

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({
        summary: 'Eliminacion de un usuario.'
    })
    @ApiResponse({
        status:200,
        description: 'El usuario fue eliminado con exito.',
    })
    @ApiBadRequestResponse({
        description: 'El usuario no pudo eliminarse.',
    })
    async delete(@Param('id') id: number) {
        try {
            return await this.UserService.delete(id);
        } catch(error) {
            return `${error}`;
        };
    };
}
