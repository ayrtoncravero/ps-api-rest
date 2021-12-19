import { 
    Body, 
    Controller, 
    Delete, 
    Get,
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
    @ApiBadRequestResponse({
        status: 400,
        description: 'No se pudieron listar los productos.'
    })
    getAll() {
        return this.ProductService.findAll();
    };

    @Post()
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
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Obtiene un producto por id.',
    })
    @ApiResponse({
        status: 200,
        description: 'Producto encontrado.',
        type: Product,
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'El producto no pudo encontrarse.',
    })
    getOne(@Param('id', ParseIntPipe) FindOneDto: number) {
        return this.ProductService.findOne(FindOneDto);
    };

    @Patch(':id')
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
    @ApiBody({
        type: Product,
    })
    update(@Param('id', ParseIntPipe) UpdateIdProductDto: number, @Body() UpdateProductDto: UpdateProductDto) {
        return this.ProductService.update(UpdateIdProductDto, UpdateProductDto);
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    @ApiOperation({
        summary: 'Eliminacion de un producto.'
    })
    @ApiResponse({
        status: 204,
        description: 'El producto fue eliminado con exito.'
    })
    @ApiBadRequestResponse({
        description: 'El producto no pudo eliminarse.'
    })
    delete(@Param('id', ParseIntPipe) DeleteProductDto: number) {
        return this.ProductService.delete(DeleteProductDto);
    };
}
