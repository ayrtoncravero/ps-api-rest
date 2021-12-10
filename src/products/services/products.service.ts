import { Body, Injectable } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validImages } from '../enums/images.enum';
import { size } from '../enums/size.enum';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private ProductRepository: Repository<Product>
    ) {};

    async findAll() {
        let product = await this.ProductRepository.find();
        
        if(!product) {
            return 'No hay productos para mostrar.';
        };

        return product;
    };

    create(body: any) {
        validateBody(body);

        const product = this.ProductRepository.create(body);

        this.ProductRepository.save(product);

        return `Se creo con exito el producto: ${body.name}.`;
    };

    async findOne(id: number) {
        if(isNaN(id)) {
            return 'Se produjo un error al buscar el producto';
        };

        let product = await this.ProductRepository.findOne(id);

        if(!product) {
            return 'No existe el producto.';
        };

        return product;
    };

    async update(id: number, body: any) {
        if(isNaN(id)) {
            return 'Se produjo un error al buscar el producto';
        };

        if(body.name === '') {
            return 'El nombre es requerido.';
        };

        if(body.price === '') {
            return 'El precio es requerido.';
        };
        if(isNaN(body.price)) {
            return 'El precio debe de ser un número.';
        };
        if(body.price <= 0) {
            return 'El precio minimo es $1.';
        };

        if(body.image === '') {
            return 'La imagen es requerida.';
        };
    
        let route = body.image;
    
        var extension = route.substring(route.lastIndexOf('.') + 1).toLowerCase();
    
        if(
            extension !== validImages.JPG && 
            extension !== validImages.PNG && 
            extension !== validImages.TIFF && 
            extension !== validImages.BMP
        ) {
            return 'El formato de imagen no es soportado.';
        };
        
        if(body.size === '') {
            return 'El talle es requerido.';
        };
        if(body.size !== size.S && 
            body.size !== size.M && 
            body.size !== size.L && 
            body.size !== size.XL && 
            body.size !== size.XXL
        ) {
            return 'El talle no es soportado.';
        };

        const product = await this.ProductRepository.findOne(id);
        
        if(!product) {
            return 'El producto no existe.';
        };

        this.ProductRepository.merge(product, body);

        this.ProductRepository.save(product);

        return `Se edito con exito el producto: ${body.name}.`;
    };

    async delete(id: number) {
        if(isNaN(id)) {
            return 'Se produjo un error al buscar el producto';
        };

        let product = await this.ProductRepository.findOne(id);

        if(!product) {
            return 'No existe el producto.';
        };

        await this.ProductRepository.delete(id)
        
        return `Se elimino con exito el producto.`;
    };
}

function validateBody(body: any) {
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

    if(body.image === '') {
        throw new Error('La imagen es requerida.');
    };

    let route = body.image;

	var extension = route.substring(route.lastIndexOf('.') + 1).toLowerCase();

    if(
        extension !== validImages.JPG && 
        extension !== validImages.PNG && 
        extension !== validImages.TIFF && 
        extension !== validImages.BMP
    ) {
        throw new Error('El formato de imagen no es soportado.');
    };
    
    if(body.size === '') {
        throw new Error('El talle es requerido.');
    };
    if(body.size !== size.S && 
        body.size !== size.M && 
        body.size !== size.L && 
        body.size !== size.XL && 
        body.size !== size.XXL
    ) {
        throw new Error('El talle no es soportado.');
    };

};
