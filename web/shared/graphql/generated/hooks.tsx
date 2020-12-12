import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export const ProductCategoriesDocument = gql`
    query ProductCategories {
  productCategories {
    id
    name
    products {
      id
      name
      measure
      price
    }
  }
}
    `;

/**
 * __useProductCategoriesQuery__
 *
 * To run a query within a React component, call `useProductCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<Types.ProductCategoriesQuery, Types.ProductCategoriesQueryVariables>) {
        return Apollo.useQuery<Types.ProductCategoriesQuery, Types.ProductCategoriesQueryVariables>(ProductCategoriesDocument, baseOptions);
      }
export function useProductCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductCategoriesQuery, Types.ProductCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<Types.ProductCategoriesQuery, Types.ProductCategoriesQueryVariables>(ProductCategoriesDocument, baseOptions);
        }
export type ProductCategoriesQueryHookResult = ReturnType<typeof useProductCategoriesQuery>;
export type ProductCategoriesLazyQueryHookResult = ReturnType<typeof useProductCategoriesLazyQuery>;
export type ProductCategoriesQueryResult = Apollo.QueryResult<Types.ProductCategoriesQuery, Types.ProductCategoriesQueryVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    measure
    price
    imageUrl
    category {
      id
      name
    }
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ProductsQuery, Types.ProductsQueryVariables>) {
        return Apollo.useQuery<Types.ProductsQuery, Types.ProductsQueryVariables>(ProductsDocument, baseOptions);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductsQuery, Types.ProductsQueryVariables>) {
          return Apollo.useLazyQuery<Types.ProductsQuery, Types.ProductsQueryVariables>(ProductsDocument, baseOptions);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<Types.ProductsQuery, Types.ProductsQueryVariables>;