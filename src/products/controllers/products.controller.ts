import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { 
    ApiTags,
    ApiResponse,
    ApiCreatedResponse,
    ApiOperation,
    ApiBadRequestResponse,
    ApiBody,
} from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
import { ProductDto } from 'src/application/dtos/product/product.dto';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
    constructor(
        private ProductService: ProductsService
    ) {};

    @Get()
    @ApiOperation({
        summary: 'Obtiene todos los productos.'
    })
    @ApiResponse(
        {
            status: 200,
            description: 'Una lista con todos los usuarios.',
            type: Product,
        }
    )
    getAll() {
        try {
            return this.ProductService.findAll();
        } catch(error) {
            return `${error}`;
        };
    };

    @Post()
    @HttpCode(201)
    @ApiOperation({
        summary: 'Crea un producto.',
    })
    @ApiResponse(
        {
            status: 201,
            description: 'El producto fue creado correctamente.'
        }
    )
    @ApiBadRequestResponse({
        description: 'El producto no pudo ser creado.'
    })
    @ApiCreatedResponse({
        description: 'El producto fue creado correctamente.',
        type: Product,
    })
    @ApiBody({
        type: Product,
    })
    create(@Body() ProductDto: ProductDto) {
        try {
            return this.ProductService.create(ProductDto);
        } catch(error) {
            return `${error}`;
        };
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Obtiene un producto por id.',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto encontrado.',
        type: Product,
    })
    @ApiBadRequestResponse({
        description: 'El producto no pudo encontrarse.',
    })
    getOne(@Param('id') id: number) {
        try {
            return this.ProductService.findOne(id);
        } catch(error) {
            return `${error}`;
        };
    };

    @Put(':id')
    @HttpCode(200)
    @ApiOperation({
        summary: 'Actualizacion de produto.',
    })
    @ApiResponse({
        status: 200,
        description: 'El producto se actualizo correctamente.',
    })
    @ApiBadRequestResponse({
        description: 'No se pudo editar el producto',
    })
    @ApiBody({
        type: Product,
    })
    update(@Param('id') id: number, ProductDto: ProductDto) {
        try {
            return this.ProductService.update(id, ProductDto);
        } catch(error) {
            return `${error}`;
        };
    }

    @Delete(':id')
    @HttpCode(204)
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
    delete(@Param('id') id: number) {
        try {
            return this.ProductService.delete(id);
        } catch(error) {
            return `${error}`;
        };
    };
}
