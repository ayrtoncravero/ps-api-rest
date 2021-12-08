import { Module } from '@nestjs/common';
import { ProductsController } from './controller/products/products.controller';

@Module({
  controllers: [ProductsController]
})
export class ProductsModule {}
