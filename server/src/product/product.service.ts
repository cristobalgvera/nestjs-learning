import { Injectable, Logger } from '@nestjs/common';
import { CreateProductArgs } from './dto/create-product.args';
import { UpdateProductArgs } from './dto/update-product.args';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { PRODUCT_CONTEXT } from '../shared/enums/contexts.enum';
import { ProductCategoryService } from '../product-category/product-category.service';

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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductArgs: UpdateProductArgs) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
