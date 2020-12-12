import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities';
import { CreateProductArgs } from './dto/create-product.args';
import { UpdateProductArgs } from './dto/update-product.args';
import { GetProductArgs } from './dto/get-product.args';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {
  }

  @Mutation(() => Product, {
    name: 'createProduct',
    description: 'Create new product with a category associated',
  })
  createOne(@Args() createProductArgs: CreateProductArgs) {
    return this.productService.createOne(createProductArgs);
  }

  @Query(() => [Product], {
    name: 'products',
    description: 'Find all products from database',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, {
    name: 'product',
    description: 'Find one product',
  })
  findOne(@Args() getProductArgs: GetProductArgs) {
    return this.productService.findOne(getProductArgs);
  }

  @Mutation(() => Product, {
    name: 'updateProduct',
    description: 'Update an existing product',
  })
  updateProduct(@Args() updateProductArgs: UpdateProductArgs) {
    return this.productService.update(updateProductArgs);
  }

  @Mutation(() => Boolean, {
    name: 'deleteProduct',
    description: 'Delete an existing product',
  })
  deleteOne(@Args() getProductArgs: GetProductArgs) {
    return this.productService.deleteOne(getProductArgs);
  }
}
