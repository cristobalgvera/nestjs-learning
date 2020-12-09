import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities';
import { CreateProductArgs } from './dto/create-product.args';
import { UpdateProductArgs } from './dto/update-product.args';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

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

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args() updateProductArgs: UpdateProductArgs) {
    return this.productService.update(updateProductArgs.id, updateProductArgs);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
