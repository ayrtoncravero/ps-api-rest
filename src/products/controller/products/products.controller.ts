import { Controller, Get, Post, Body } from '@nestjs/common';
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

    @Post()
    create(@Body() body: any) {
        try {
            return this.ProductService.create(body);
        } catch(error) {
            return error;
        };
    };
}
