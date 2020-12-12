export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create new product with a category associated */
  createProduct: Product;
  /** Create new category for products */
  createProductCategory: ProductCategory;
  /** Delete an existing product */
  deleteProduct: Scalars['Boolean'];
  /** Delete an existing product category */
  deleteProductCategory: Scalars['Boolean'];
  /** Update an existing product */
  updateProduct: Product;
  /** Update an existing product category */
  updateProductCategory: Scalars['Boolean'];
};


export type MutationCreateProductArgs = {
  imageUrl?: Maybe<Scalars['String']>;
  measure?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  productCategoryId: Scalars['ID'];
};


export type MutationCreateProductCategoryArgs = {
  name: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProductCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  measure?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  productCategoryId?: Maybe<Scalars['ID']>;
};


export type MutationUpdateProductCategoryArgs = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  /** Product category */
  category: ProductCategory;
  /** Product ID */
  id: Scalars['ID'];
  /** Product image url */
  imageUrl?: Maybe<Scalars['String']>;
  /** Product measurement */
  measure?: Maybe<Scalars['String']>;
  /** Product name */
  name: Scalars['String'];
  /** Product price */
  price: Scalars['Int'];
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  /** Category ID */
  id: Scalars['ID'];
  /** Category name */
  name: Scalars['String'];
  /** All product from specific category */
  products: Array<Product>;
};

export type Query = {
  __typename?: 'Query';
  /** Find one product */
  product: Product;
  /** Find all categories with his data */
  productCategories: Array<ProductCategory>;
  /** Find all products of one category */
  productCategory: ProductCategory;
  /** Find all products from database */
  products: Array<Product>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductCategoryArgs = {
  id: Scalars['ID'];
};
