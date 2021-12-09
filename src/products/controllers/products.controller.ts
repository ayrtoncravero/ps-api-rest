import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@Controller('api/products')
export class ProductsController {
    constructor(
        private ProductService: ProductsService
    ) {};

    @Get()
    getAll() {
        return this.ProductService.findAll();
    };

    @Post()
    create(@Body() body: any) {
        try {
            return this.ProductService.create(body);
        } catch(error) {
            return error
        };
    }

    @Get()
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
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        try {
            return this.ProductService.delete(id);
        } catch(error) {
            return error;
        };
    };
}
