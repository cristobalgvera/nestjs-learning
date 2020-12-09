import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductCategoryModule } from '../product-category/product-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    ProductCategoryModule,
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
