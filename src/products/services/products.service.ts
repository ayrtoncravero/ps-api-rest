import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

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
        const product = this.ProductRepository.create(body);

        this.ProductRepository.save(product);

        return `Se creo con exito el producto: ${body.name}.`;
    };

    findOne(id: number) {
        return this.ProductRepository.findOne(id);
    };
}
