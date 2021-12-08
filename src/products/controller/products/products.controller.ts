import { Controller } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private ProductService: ProductsService
    ) {};
}
