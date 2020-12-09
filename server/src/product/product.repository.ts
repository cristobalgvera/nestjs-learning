import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { PRODUCT_CONTEXT } from '../shared/enums/contexts.enum';
import { CreateProductArgs } from './dto/create-product.args';
import { ProductCategory } from '../product-category/entities';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private readonly logger = new Logger(PRODUCT_CONTEXT.REPOSITORY);

  async createOne(
    { name, price, imageUrl, measure }: CreateProductArgs,
    productCategory: ProductCategory,
  ) {
    const product = new Product();
    product.name = name;
    product.price = price;
    product.category = productCategory;
    product.imageUrl = imageUrl;
    product.measure = measure;
    try {
      const dbProduct = await this.save(product);
      this.logger.debug(
        `Product ID: ${dbProduct.id} successfully saved in database`,
      );
      return dbProduct;
    } catch (error) {
      this.logger.error(
        `Error while saving product in database: ${error.name}`,
      );
      throw new InternalServerErrorException(
        `Error while saving product name: ${name}`,
      );
    }
  }
}
