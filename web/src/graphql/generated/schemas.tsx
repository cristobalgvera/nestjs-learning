export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Successful validateUser response */
export type LoginResponseType = {
  __typename?: "LoginResponseType";
  /** JWT personal access token */
  accessToken: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Login with username and password */
  login: LoginResponseType;
  /** Register a new user in database */
  register: User;
  /** Testing mutation to revoke refresh JWT */
  revokeRefreshTokensForUser: Scalars["Boolean"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRevokeRefreshTokensForUserArgs = {
  id: Scalars["Float"];
};

export type Query = {
  __typename?: "Query";
  /** Find all database users */
  users: Array<User>;
  whoAmI: User;
};

/** Common application user */
export type User = {
  __typename?: "User";
  /** User email */
  email: Scalars["String"];
  id: Scalars["Int"];
};
