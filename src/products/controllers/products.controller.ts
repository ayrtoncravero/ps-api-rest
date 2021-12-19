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
    @ApiOperation({
        summary: 'Obtiene todos los productos.'
    })
    @ApiResponse({
        status: 200,
        description: 'Una lista con todos los usuarios.',
        type: Product,
    })
    getAll() {
        return this.ProductService.findAll();
    };

    @Post()
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    @ApiOperation({
        summary: 'Crea un producto.',
    })
    @ApiResponse({
        status: 201,
        description: 'El producto fue creado correctamente.'
    })
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
    create(@Body(new ValidationPipe()) CreateProductDto: CreateProductDto) {
        return this.ProductService.create(CreateProductDto);
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
    getOne(@Param('id', ParseIntPipe) FindOneDto: number) {
        return this.ProductService.findOne(FindOneDto);
    };

    @Patch(':id')
    @UsePipes(ValidationPipe)
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
    update(@Param('id', ParseIntPipe) UpdateIdProductDto: number, @Body() UpdateProductDto: UpdateProductDto) {
        return this.ProductService.update(UpdateIdProductDto, UpdateProductDto);
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    @HttpCode(200)
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
    delete(@Param('id', ParseIntPipe) DeleteProductDto: number) {
        return this.ProductService.delete(DeleteProductDto);
    };
}
