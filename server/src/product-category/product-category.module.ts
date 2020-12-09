import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryResolver } from './product-category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryRepository } from './product-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryRepository])],
  providers: [ProductCategoryResolver, ProductCategoryService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
