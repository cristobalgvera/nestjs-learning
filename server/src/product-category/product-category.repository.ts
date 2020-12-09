import { EntityRepository, Repository } from 'typeorm';
import { ProductCategory } from './entities';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { PRODUCT_CATEGORY_CONTEXT } from '../shared/enums/contexts.enum';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  private readonly logger = new Logger(PRODUCT_CATEGORY_CONTEXT.REPOSITORY);

  async createOne(name: ProductCategory['name']) {
    const productCategory = new ProductCategory();
    productCategory.name = name;
    try {
      const dbProductCategory = await this.save(productCategory);
      this.logger.debug(
        `Product category name: ${name} was created successfully`,
      );
      return dbProductCategory;
    } catch (error) {
      this.logger.error(
        `Error while adding product category to database: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Error trying to save product category',
      );
    }
  }
}
