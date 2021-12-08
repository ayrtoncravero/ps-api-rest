import { Controller, Get } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private ProductService: ProductsService
    ) {};

    @Get()
    findAll() {
        return this.ProductService.findAll();
    };
}
