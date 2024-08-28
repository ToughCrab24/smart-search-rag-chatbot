import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      [process.env.SMART_SEARCH_URL as string]: {
        headers: {
          Authorization: `Bearer ${process.env.SMART_SEARCH_ACCESS_TOKEN}`,
        },
      },
    },
  ],
  documents: "src/graphql/**/*.graphql", // Replace with the path to your GraphQL queries/mutations
  generates: {
    "src/graphql/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: true, // Optional, depending on your needs
      },
    },
  },
};

export default config;
