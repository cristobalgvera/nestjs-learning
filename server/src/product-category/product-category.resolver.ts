import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from './entities';
import { CreateProductCategoryArgs } from './dto/create-product-category.args';
import { GetProductCategoryArgs } from './dto/get-product-category.args';
import { DeleteProductCategoryArgs } from './dto/delete-product-category.args';
import { UpdateProductCategoryArgs } from './dto/update-product-category.args';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Query(() => [ProductCategory], {
    name: 'productCategories',
    description: 'Find all categories with his data',
  })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Query(() => ProductCategory, {
    name: 'productCategory',
    description: 'Find all products of one category',
  })
  findOne(@Args() getProductCategoryArgs: GetProductCategoryArgs) {
    return this.productCategoryService.findOne(getProductCategoryArgs);
  }

  @Mutation(() => ProductCategory, {
    name: 'createProductCategory',
    description: 'Create new category for products',
  })
  createOne(@Args() createProductCategoryArgs: CreateProductCategoryArgs) {
    return this.productCategoryService.createOne(createProductCategoryArgs);
  }

  @Mutation(() => Boolean, {
    name: 'deleteProductCategory',
    description: 'Delete an existing product category',
  })
  deleteOne(@Args() deleteProductCategoryArgs: DeleteProductCategoryArgs) {
    return this.productCategoryService.deleteOne(deleteProductCategoryArgs);
  }

  @Mutation(() => Boolean, {
    name: 'updateProductCategory',
    description: 'Update an existing product category',
  })
  updateOne(@Args() updateProductCategoryArgs: UpdateProductCategoryArgs) {
    return this.productCategoryService.updateOne(updateProductCategoryArgs);
  }
}
