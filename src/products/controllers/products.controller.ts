import { 
    Body, 
    Controller, 
    Delete, 
    Get,
    HttpCode,
    Param, 
    ParseIntPipe, 
    Patch, 
    Post,  
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
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
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/products/dtos/create.product.dto';
import { UpdateProductDto } from 'src/products/dtos/update.product.dto';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
    constructor(
        private ProductService: ProductsService
    ) {};

    @Get()
    @HttpCode(200)
    @ApiOperation({
        summary: 'Obtiene todos los productos.'
    })
    @ApiResponse({
        status: 200,
        description: 'Una lista con todos los productos.',
        type: Product,
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'No se pudo listar a los productos.'
    })
    getAll() {
        return this.ProductService.findAll();
    };

    @Post()
    @HttpCode(201)
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Crea un producto.',
    })
    @ApiResponse({
        status: 201,
        description: 'El producto fue creado correctamente.'
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'El producto no pudo ser creado.'
    })
    @ApiCreatedResponse({
        description: 'El producto fue creado correctamente.',
        type: Product,
    })
    @ApiBody({
        type: Product,
    })
    create(@Body(new ValidationPipe()) CreateProductDto: CreateProductDto) {
        return this.ProductService.create(CreateProductDto);
    }

    @Get(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Obtiene un producto por id.',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto encontrado.',
        type: Product,
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Representa un identificador unico del producto.',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'Se produjo un error al buscar el producto.',
    })
    @ApiBadRequestResponse({
        status: 404,
        description: 'Producto no encontrado.'
    })
    getOne(@Param('id', ParseIntPipe) FindOneDto: number) {
        return this.ProductService.findOne(FindOneDto);
    };

    @Patch(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Actualizacion de produto.',
    })
    @ApiResponse({
        status: 200,
        description: 'El producto se actualizo correctamente.',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'No se pudo editar el producto',
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Producto no encontrado.'
    })
    @ApiBody({
        type: Product,
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Representa un identificador unico del producto.',
    })
    update(@Param('id', ParseIntPipe) UpdateIdProductDto: number, @Body() UpdateProductDto: UpdateProductDto) {
        return this.ProductService.update(UpdateIdProductDto, UpdateProductDto);
    }

    @Delete(':id')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Eliminacion de un producto.'
    })
    @ApiResponse({
        status: 200,
        description: 'El producto fue eliminado con exito.'
    })
    @ApiBadRequestResponse({
        description: 'El producto no pudo eliminarse.'
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'No se pudo editar el producto',
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Producto no encontrado',
    })
    @ApiParam({
        name: 'id',
        example: 1,
        type: Number,
        description: 'Representa un identificador unico del producto.',
    })
    delete(@Param('id', ParseIntPipe) DeleteProductDto: number) {
        return this.ProductService.delete(DeleteProductDto);
    };
}
