import { 
    Body, 
    Controller, 
    Get, 
    Post, 
    Param, 
    Delete,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    Patch,
} from '@nestjs/common';
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
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';

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
    @ApiBadRequestResponse({
        status: 400,
        description: 'No se encontraron usuarios.',
    })
    getAll() {
        return this.UserService.findAll();
    }

    @Post() 
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Crear un usuario.',
    })
    @ApiResponse({
        status: 201,
        description: 'El usuario fue creado correctamente.',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'El usuario no pudo ser creado.',
    })
    @ApiCreatedResponse({
        description: 'El usuario fue creado correctamente',
        type: User,
    })
    @ApiBody({
        type: User,
    })
    create(@Body(new ValidationPipe()) CreateUserDto: CreateUserDto) {
        return this.UserService.create(CreateUserDto);
    };

    @Get(':id')
    @ApiOperation({
        summary: 'Obtiene un usuario por id.',
    })
    @ApiResponse({
        status: 200,
        description: 'Usuario encontrado.',
        type: User,
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'El usuario no pudo encontrarse.'
    })
    getOne(@Param('id', ParseIntPipe) FindOneDto: number) {
        return this.UserService.findOne(FindOneDto);
    };

    @Patch(':id')
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Actualizacion de usuario.'
    })
    @ApiResponse({
        status: 200,
        description: 'El usuario se actualizo correctamente.',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'No se pudo encontrar el producto.',
    })
    @ApiBody({
        type: User,
    })
    update(@Param('id', ParseIntPipe) UpdateIdUserDto: number, @Body() UpdateUserDto: UpdateUserDto) {
        return this.UserService.update(UpdateIdUserDto, UpdateUserDto);
    };

    @Delete(':id')
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Eliminacion de un usuario.'
    })
    @ApiResponse({
        status:204,
        description: 'El usuario fue eliminado con exito.',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'El usuario no pudo eliminarse.',
    })
    async delete(@Param('id', ParseIntPipe) DeleteIdUserDto: number) {
        return await this.UserService.delete(DeleteIdUserDto);
    };
}
