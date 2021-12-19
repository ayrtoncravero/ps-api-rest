import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validImages } from '../enums/images.enum';
import { size } from '../enums/size.enum';
import { CreateProductDto } from '../dtos/create.product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private ProductRepository: Repository<Product>
    ) {};

    async findAll() {
        let products = await this.ProductRepository.find();

        validateProductExist(products);

        return products;
    };

    create(body: any) {
        validateBody(body);

        const product = this.ProductRepository.create(body);

        this.ProductRepository.save(product);

        return {
            message: 'Se creo con exito el producto.'
        };
    };

    async findOne(FindOneDto: number) {
        let product = await this.ProductRepository.findOne(FindOneDto);

        if(!product) {
            throw new NotFoundException('No existe el producto.');
        };

        return product;
    };

    async update(id: number, body: any) {
        validateBody(body);

        const product = await this.ProductRepository.findOne(id);
        
        if(!product) {
            throw new NotFoundException('El producto no existe.');
        };

        this.ProductRepository.merge(product, body);

        this.ProductRepository.save(product);

        return {
            message: 'Se edito con exito el producto.'
        };
    };

    async delete(id: number) {
        let product = await this.ProductRepository.findOne(id);

        if(!product) {
            throw new NotFoundException('No existe el producto.');
        };

        await this.ProductRepository.delete(id)
        
        return {
            message: 'Se elimino con exito el producto.'
        };
    };
}

function validateBody(body: any) {
    if(body.name === '') {
        throw new BadRequestException('El nombre es requerido.');
    };

    if(body.price === '') {
        throw new BadRequestException('El precio es requerido.');
    };
    if(body.price <= 0) {
        throw new BadRequestException('El precio minimo es $1.');
    };
    if(isNaN(body.price)) {
        throw new BadRequestException('El precio debe de ser un numero.');
    };

    if(body.image === '') {
        throw new BadRequestException('La imagen es requerida.');
    };

    let route = body.image;

	var extension = route.substring(route.lastIndexOf('.') + 1).toLowerCase();

    if(
        extension !== validImages.JPG && 
        extension !== validImages.PNG && 
        extension !== validImages.TIFF && 
        extension !== validImages.BMP
    ) {
        throw new BadRequestException('El formato de imagen no es soportado.');
    };
    
    if(body.size === '') {
        throw new BadRequestException('El talle es requerido.');
    };
    if(body.size !== size.S && 
        body.size !== size.M && 
        body.size !== size.L && 
        body.size !== size.XL && 
        body.size !== size.XXL
    ) {
        throw new BadRequestException('El talle no es soportado.');
    };
};

function validateProductExist(products: Product[]) {
    if(!products) {
        throw new NotFoundException('No hay productos para mostrar.');
    };
};
