import { Body, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private ProductRepository: Repository<Product>
    ) {};

    findAll() {
        return this.ProductRepository.find();
    };

    create(body: any) {
        //Validation
        validateBody(body);

        const product = this.ProductRepository.create(body);

        //this.ProductRepository.save(product);

        //return `Se creo con exito el producto: ${body.name}.`;
    };

    findOne(id: number) {
        return this.ProductRepository.findOne(id);
    };

    async update(id: number, body: any) {
        const product = await this.ProductRepository.findOne(id);
        
        if(product === undefined) {
            throw new Error('El producto no existe,');
        };

        this.ProductRepository.merge(product, body);

        this.ProductRepository.save(product);

        return `Se edito con exito el producto: ${body.name}.`;
    };

    async delete(id: number) {
        await this.ProductRepository.delete(id);
        
        return `Se elimino con exito el producto.`;
    };
}

function validateBody(body: any) {
    console.log(body);
    if(body.name === '') {
        throw new Error('El nombre es requerido.');
    };

    if(body.price === '') {
        throw new Error('El precio es requerido.');
    };
    if(body.price <= 0) {
        throw new Error('El precio minimo es $1.');
    };
    if(isNaN(body.price)) {
        throw new Error('El precio debe de ser un numero.');
    };

    if(body.image) {
        
    };
};
