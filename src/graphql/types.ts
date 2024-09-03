import { GraphQLError } from "graphql";

export interface GraphqlResponse<T> {
  data: T;
  errors?: GraphQLError[] | undefined;
  extensions?: any;
  headers: Headers;
  status: number;
}
