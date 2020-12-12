import * as Types from './schemas';

export type ProductCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = (
  { __typename?: 'Query' }
  & { productCategories: Array<(
    { __typename?: 'ProductCategory' }
    & Pick<Types.ProductCategory, 'id' | 'name'>
    & { products: Array<(
      { __typename?: 'Product' }
      & Pick<Types.Product, 'id' | 'name' | 'measure' | 'price'>
    )> }
  )> }
);

export type ProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Types.Product, 'id' | 'name' | 'measure' | 'price' | 'imageUrl'>
    & { category: (
      { __typename?: 'ProductCategory' }
      & Pick<Types.ProductCategory, 'id' | 'name'>
    ) }
  )> }
);
