// These are the types that are used in the `getContext` function
type Doc = {
  id: string;
  data: Record<string, any>;
  score: number;
};

type Similarity = {
  total: number;
  docs: Doc[];
};

type Response = {
  data: {
    similarity: Similarity;
  };
  errors?: Array<{ message: string }>;
};

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (message: string): Promise<Response> => {
  const url = process.env.SMART_SEARCH_URL ?? "";
  const token = process.env.SMART_SEARCH_ACCESS_TOKEN ?? "";

  const query = `query GetContext($message: String!, $field: String!) {
    similarity(
      input: {
        nearest: {
          text: $message,
          field: $field
        }
      }) {
      total
      docs {
        id
        data
        score
      }
    }
  }`;

  const variables = {
    message,
    field: "post_content",
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  return await response.json();
};
