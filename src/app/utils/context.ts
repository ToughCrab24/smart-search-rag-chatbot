import Client from "@/graphql/client";
import { SimilaritySearchQuery } from "@/graphql/graphql";
import { GraphqlResponse } from "@/graphql/types";

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (
  message: string
): Promise<GraphqlResponse<SimilaritySearchQuery>> => {
  return await Client.SimilaritySearch({
    input: {
      nearest: {
        field: "post_content",
        text: message,
      },
    },
  });
};
