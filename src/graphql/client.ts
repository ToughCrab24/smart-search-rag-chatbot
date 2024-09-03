import { GraphQLClient } from "graphql-request";
import { getSdk } from "./graphql";

export const client = new GraphQLClient(
  process.env.SMART_SEARCH_URL as string,
  {
    headers: {
      Authorization: `Bearer ${process.env.SMART_SEARCH_ACCESS_TOKEN}`,
    },
    fetch,
  }
);

// get the sdk from the client
export default getSdk(client);
