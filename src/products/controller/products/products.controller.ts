import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
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

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any) {
        try {
            return this.ProductService.update(id, body);
        } catch(error) {
            return error;
        };
    };

    @Delete(':id')
    delete(@Param('id') id: number) {
        try {
            return this.ProductService.delete(id);
        } catch(error) {
            return error;
        };
    };
}
