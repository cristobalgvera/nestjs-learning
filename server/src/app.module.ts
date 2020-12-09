import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductCategoryModule } from './product-category/product-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      sortSchema: true,
    }),
    ProductModule,
    ProductCategoryModule,
  ],
})
export class AppModule {}
