import * as Types from "./schemas";

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars["String"];
  password: Types.Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "LoginResponseType" } & Pick<
    Types.LoginResponseType,
    "accessToken"
  >;
};

export type RegisterMutationVariables = Types.Exact<{
  email: Types.Scalars["String"];
  password: Types.Scalars["String"];
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & Pick<Types.User, "id" | "email">;
};

export type UsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<Types.User, "id" | "email">>;
};

export type WhoAmIQueryVariables = Types.Exact<{ [key: string]: never }>;

export type WhoAmIQuery = { __typename?: "Query" } & {
  whoAmI: { __typename?: "User" } & Pick<Types.User, "id" | "email">;
};
