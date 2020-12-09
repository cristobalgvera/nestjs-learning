import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PRODUCT_CATEGORY_CONTEXT } from '../shared/enums/contexts.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategoryRepository } from './product-category.repository';
import { CreateProductCategoryArgs } from './dto/create-product-category.args';
import { GetProductCategoryArgs } from './dto/get-product-category.args';
import { capitalize } from '../shared/util/capitalize';
import { DeleteProductCategoryArgs } from './dto/delete-product-category.args';
import { UpdateProductCategoryArgs } from './dto/update-product-category.args';

@Injectable()
export class ProductCategoryService {
  private readonly logger = new Logger(PRODUCT_CATEGORY_CONTEXT.SERVICE);

  constructor(
    @InjectRepository(ProductCategoryRepository)
    private readonly productCategoryRepository: ProductCategoryRepository,
  ) {}

  async findAll() {
    return this.productCategoryRepository.find();
  }

  async findOne({ id }: GetProductCategoryArgs) {
    this.logger.debug(`Getting product category data ID: ${id} from database`);
    try {
      const productCategory = await this.productCategoryRepository.findOneOrFail(
        { id },
      );
      this.logger.debug('Product category was obtained successfully');
      return productCategory;
    } catch (error) {
      this.logger.error(
        `Error obtaining product category from database: ${error.name}`,
      );
      throw new NotFoundException(`Product category ID: ${id} was not found`);
    }
  }

  async createOne({ name }: CreateProductCategoryArgs) {
    const trimmedName = capitalize(name);
    this.logger.debug(`Creating new product category name: ${trimmedName}`);
    return this.productCategoryRepository.createOne(trimmedName);
  }

  async deleteOne({ id }: DeleteProductCategoryArgs) {
    this.logger.debug(`Deleting product category ID: ${id}`);
    const { affected } = await this.productCategoryRepository.delete(id);

    if (!!affected) this.logger.debug(`Successful transaction`);
    else
      this.logger.debug(
        `There is no product category with ID: ${id} in database`,
      );

    return !!affected;
  }

  async updateOne({ id, name }: UpdateProductCategoryArgs) {
    this.logger.debug(`Updating product category ID: ${id}`);
    const trimmedName = capitalize(name);
    const { affected } = await this.productCategoryRepository.update(
      {
        id: id,
      },
      { name: trimmedName },
    );

    if (!!affected) this.logger.debug(`Successful transaction`);
    else
      this.logger.debug(
        `There is no product category with ID: ${id} in database`,
      );

    return !!affected;
  }
}
