import * as Types from "./operations";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.LoginMutation,
    Types.LoginMutationVariables
  >
) {
  return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  Types.LoginMutation,
  Types.LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  Types.RegisterMutation,
  Types.RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Types.RegisterMutation,
    Types.RegisterMutationVariables
  >
) {
  return Apollo.useMutation<
    Types.RegisterMutation,
    Types.RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<
  Types.RegisterMutation
>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  Types.RegisterMutation,
  Types.RegisterMutationVariables
>;
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
  baseOptions?: Apollo.QueryHookOptions<
    Types.UsersQuery,
    Types.UsersQueryVariables
  >
) {
  return Apollo.useQuery<Types.UsersQuery, Types.UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.UsersQuery,
    Types.UsersQueryVariables
  >
) {
  return Apollo.useLazyQuery<Types.UsersQuery, Types.UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  Types.UsersQuery,
  Types.UsersQueryVariables
>;
export const WhoAmIDocument = gql`
  query WhoAmI {
    whoAmI {
      id
      email
    }
  }
`;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.WhoAmIQuery,
    Types.WhoAmIQueryVariables
  >
) {
  return Apollo.useQuery<Types.WhoAmIQuery, Types.WhoAmIQueryVariables>(
    WhoAmIDocument,
    baseOptions
  );
}
export function useWhoAmILazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.WhoAmIQuery,
    Types.WhoAmIQueryVariables
  >
) {
  return Apollo.useLazyQuery<Types.WhoAmIQuery, Types.WhoAmIQueryVariables>(
    WhoAmIDocument,
    baseOptions
  );
}
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<
  Types.WhoAmIQuery,
  Types.WhoAmIQueryVariables
>;
