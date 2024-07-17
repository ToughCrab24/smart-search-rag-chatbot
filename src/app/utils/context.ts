// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (
  message: string
): Promise<Record<string, any>> => {
  const url = process.env.SMART_SEARCH_URL ?? "";
  const token = process.env.SMART_SEARCH_ACCESS_TOKEN ?? "";

  const query = `
    {
        find(
            query: "${message}"
            semanticSearch: { searchBias: 10, fields: ["post_content"] }
        ) { 
            total
            documents {
                id
                score
                data
            }
        }
    }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();

  return data;
};
