import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

    @Get(':id')
    getOne(@Param('id') id: number) {
        try {
            return this.ProductService.findOne(id);
        } catch(error) {
            return error;
        };
    };
}
