import * as Types from "./schemas";

export type UsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UsersQuery = { __typename?: "Query" } & {
  users: Array<{ __typename?: "User" } & Pick<Types.User, "id" | "email">>;
};
