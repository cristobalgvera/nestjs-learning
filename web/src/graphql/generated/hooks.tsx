import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export const UsersDocument = gql`
    query Users {
        users {
            id
            email
        }
    }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
    baseOptions?: Apollo.QueryHookOptions<Types.UsersQuery,
        Types.UsersQueryVariables>,
) {
    return Apollo.useQuery<Types.UsersQuery, Types.UsersQueryVariables>(
        UsersDocument,
        baseOptions,
    );
}

export function useUsersLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<Types.UsersQuery,
        Types.UsersQueryVariables>,
) {
    return Apollo.useLazyQuery<Types.UsersQuery, Types.UsersQueryVariables>(
        UsersDocument,
        baseOptions,
    );
}

export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<Types.UsersQuery,
    Types.UsersQueryVariables>;
