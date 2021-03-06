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
    HttpCode,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { 
    ApiTags,
    ApiResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiBadRequestResponse,
    ApiBody,
    ApiParam,
    ApiNotFoundResponse,
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
    @HttpCode(200)
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
        description: 'Se produjo un error al buscar el usuario.',
    })
    getAll() {
        return this.UserService.findAll();
    }

    @Post()
    @HttpCode(201) 
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
        description: 'Se produjo un error al buscar el usuario.',
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
    @HttpCode(200)
    @ApiOperation({
        summary: 'Obtiene un usuario por id.',
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Representa un identificador unico del usuario.',
    })
    @ApiResponse({
        status: 200,
        description: 'Usuario encontrado.',
        type: User,
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'Se produjo un error al buscar el usuario.'
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Usuario no encontrado.'
    })
    getOne(@Param('id', ParseIntPipe) FindOneDto: number) {
        return this.UserService.findOne(FindOneDto);
    };

    @Patch(':id')
    @HttpCode(200)
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
        description: 'No se pudo encontrar el usuario.',
    })
    @ApiNotFoundResponse({
        status: 400,
        description: 'Se produjo un error al buscar el usuario.',
    })
    @ApiBody({
        type: User,
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Representa un identificador unico del usuario.',
    })
    update(@Param('id', ParseIntPipe) UpdateIdUserDto: number, @Body() UpdateUserDto: UpdateUserDto) {
        return this.UserService.update(UpdateIdUserDto, UpdateUserDto);
    };

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Eliminacion de un usuario.'
    })
    @ApiResponse({
        status:200,
        description: 'El usuario fue eliminado con exito.',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'Se produjo un error al buscar el usuario.',
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Usuario no encontrado.',
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Representa un identificador unico del usuario.',
    })
    delete(@Param('id', ParseIntPipe) DeleteIdUserDto: number) {
        return this.UserService.delete(DeleteIdUserDto);
    };
}
