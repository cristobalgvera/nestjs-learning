import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductArgs } from './dto/create-product.args';
import { UpdateProductArgs } from './dto/update-product.args';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { PRODUCT_CONTEXT } from '../shared/enums/contexts.enum';
import { ProductCategoryService } from '../product-category/product-category.service';
import { GetProductArgs } from './dto/get-product.args';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(PRODUCT_CONTEXT.SERVICE);

  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async createOne(createProductArgs: CreateProductArgs) {
    this.logger.debug(`Creating product name: ${createProductArgs.name}`);
    const productCategory = await this.productCategoryService.findOne({
      id: createProductArgs.productCategoryId,
    });
    return this.productRepository.createOne(createProductArgs, productCategory);
  }

  async findAll() {
    this.logger.debug('Getting all products from database');
    return this.productRepository.find();
  }

  async findOne({ id }: GetProductArgs) {
    this.logger.debug(`Getting product data ID: ${id} from database`);
    try {
      const product = await this.productRepository.findOneOrFail({ id });
      this.logger.debug('Product was obtained successfully');
      return product;
    } catch (error) {
      this.logger.error(`Error obtaining product from database: ${error.name}`);
      throw new NotFoundException(`Product ID: ${id} was not found`);
    }
  }

  async update(updateProductArgs: UpdateProductArgs) {
    this.logger.debug(`Updating product ID: ${updateProductArgs.id}`);
    const dbProduct = await this.findOne({ id: updateProductArgs.id });
    Object.keys(updateProductArgs).forEach((key) => {
      if (updateProductArgs[key]) dbProduct[key] = updateProductArgs[key];
    });

    await this.productRepository.update({ id: dbProduct.id }, dbProduct);
    this.logger.debug('Product was updated successfully');
    return dbProduct;
  }

  async deleteOne({ id }: GetProductArgs) {
    this.logger.debug(`Deleting product ID: ${id}`);
    const { affected } = await this.productRepository.delete(id);

    if (!!affected) this.logger.debug(`Successful transaction`);
    else this.logger.debug(`There is no product with ID: ${id} in database`);

    return !!affected;
  }
}
