import { GraphQLClient, RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Map: { input: any; output: any; }
};

export type AggregateInput = {
  ranges?: InputMaybe<Array<InputMaybe<RangeAggregateInput>>>;
  terms?: InputMaybe<Array<InputMaybe<TermAggregateInput>>>;
};

export type AggregateOutput = {
  __typename?: 'AggregateOutput';
  ranges?: Maybe<Array<Maybe<RangeAggregateOutput>>>;
  terms?: Maybe<Array<Maybe<TermAggregateOutput>>>;
};

export type BoostTrendingBy = {
  boost?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type BulkDocument = {
  __typename?: 'BulkDocument';
  /** Unique identifier for the document. e.g. post:1 */
  id: Scalars['ID']['output'];
};

export type BulkIndexInput = {
  documents?: InputMaybe<Array<DocumentInput>>;
  meta?: InputMaybe<MetaInput>;
};

export type BulkIndexMutationResponse = MutationResponse & {
  __typename?: 'BulkIndexMutationResponse';
  code: Scalars['String']['output'];
  documents?: Maybe<Array<BulkDocument>>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ChunkingConfig = {
  enabled: Scalars['Boolean']['input'];
};

export type ChunkingConfigType = {
  __typename?: 'ChunkingConfigType';
  enabled: Scalars['Boolean']['output'];
};

export type ConfigMutation = {
  __typename?: 'ConfigMutation';
  semanticSearch?: Maybe<SemanticSearchConfig>;
};


export type ConfigMutationSemanticSearchArgs = {
  chunking?: InputMaybe<ChunkingConfig>;
  fields: Array<Scalars['String']['input']>;
  type?: InputMaybe<Semantic_Search_Type>;
};

export type ConfigQuery = {
  __typename?: 'ConfigQuery';
  semanticSearch?: Maybe<SemanticSearchConfig>;
};

/** Delete all mutation response */
export type DeleteAllMutationResponse = MutationResponse & {
  __typename?: 'DeleteAllMutationResponse';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Doc = {
  __typename?: 'Doc';
  data: Scalars['Map']['output'];
  id: Scalars['ID']['output'];
  innerDocs: Array<Maybe<InnerDocs>>;
  score?: Maybe<Scalars['Float']['output']>;
};

/** A document. */
export type Document = {
  __typename?: 'Document';
  /** Document data. */
  data: Scalars['Map']['output'];
  /** Unique identifier for the document. e.g. post:1 */
  id: Scalars['ID']['output'];
};

/** Document input data */
export type DocumentInput = {
  /** Document data. */
  data: Scalars['Map']['input'];
  /** Optional unique identifier for the document. e.g. post:1 */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Optional meta data */
  meta?: InputMaybe<MetaInput>;
};

/** Document mutation response. */
export type DocumentMutationResponse = MutationResponse & {
  __typename?: 'DocumentMutationResponse';
  code: Scalars['String']['output'];
  document?: Maybe<Document>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type InnerDocs = {
  __typename?: 'InnerDocs';
  docs: Array<Maybe<Doc>>;
  field: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type InsightData = {
  __typename?: 'InsightData';
  from?: Maybe<Scalars['DateTime']['output']>;
  searchTerms: Array<Maybe<SearchTermData>>;
  searchTermsNoResults: Array<Maybe<SearchTermData>>;
  to?: Maybe<Scalars['DateTime']['output']>;
};


export type InsightDataSearchTermsArgs = {
  top?: InputMaybe<Scalars['Int']['input']>;
};


export type InsightDataSearchTermsNoResultsArgs = {
  top?: InputMaybe<Scalars['Int']['input']>;
};

/** Optional meta data input for logging */
export type MetaInput = {
  /** Performed action e.g. index */
  action?: InputMaybe<Scalars['String']['input']>;
  /** The requester hostname */
  source?: InputMaybe<Scalars['String']['input']>;
  /** The requester system name */
  system?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates or updates multiple documents in an index. */
  bulkIndex?: Maybe<BulkIndexMutationResponse>;
  config?: Maybe<ConfigMutation>;
  /** Removes a document from the index. */
  delete?: Maybe<DocumentMutationResponse>;
  /** Removes all documents from the index */
  deleteAll?: Maybe<DeleteAllMutationResponse>;
  /** Creates or updates a document in an index. */
  index?: Maybe<DocumentMutationResponse>;
};


export type MutationBulkIndexArgs = {
  input: BulkIndexInput;
};


export type MutationDeleteArgs = {
  id: Scalars['ID']['input'];
  meta?: InputMaybe<MetaInput>;
};


export type MutationDeleteAllArgs = {
  meta?: InputMaybe<MetaInput>;
};


export type MutationIndexArgs = {
  input: DocumentInput;
};

export type MutationResponse = {
  /** Represents the status of the data transfer. An HTTP status code */
  code: Scalars['String']['output'];
  /** Human-readable string that describes the result of the mutation. */
  message: Scalars['String']['output'];
  /** Indicates whether the mutation was successful. */
  success: Scalars['Boolean']['output'];
};

export type NearestInput = {
  field: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type OrderBy = {
  direction?: OrderByDirection;
  field: Scalars['String']['input'];
  unmappedType?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderByDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  config?: Maybe<ConfigQuery>;
  /** Searches for documents in an index, based on specific parameters. */
  find: SearchResult;
  /** Search insight data on search terms */
  insights?: Maybe<InsightData>;
  recommendations?: Maybe<RecommendationsData>;
  similarity?: Maybe<SimilarityOutput>;
};


export type QueryFindArgs = {
  aggregate?: InputMaybe<AggregateInput>;
  fields?: InputMaybe<Array<InputMaybe<SearchField>>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  meta?: InputMaybe<MetaInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<InputMaybe<OrderBy>>>;
  query: Scalars['String']['input'];
  searchAfter?: InputMaybe<Array<Scalars['String']['input']>>;
  semanticSearch?: InputMaybe<SemanticSearchInput>;
  tolerance?: InputMaybe<SearchOption>;
};


export type QueryInsightsArgs = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryRecommendationsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySimilarityArgs = {
  input: SimilarityInput;
};

export type RangeAggregateInput = {
  field: Scalars['String']['input'];
  ranges?: InputMaybe<Array<InputMaybe<RangeInput>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type RangeAggregateOutput = {
  __typename?: 'RangeAggregateOutput';
  field: Scalars['String']['output'];
  ranges?: Maybe<Array<Maybe<RangeOutput>>>;
};

export type RangeInput = {
  from?: InputMaybe<Scalars['Float']['input']>;
  to?: InputMaybe<Scalars['Float']['input']>;
};

export type RangeOutput = {
  __typename?: 'RangeOutput';
  count?: Maybe<Scalars['Int']['output']>;
  from?: Maybe<Scalars['Float']['output']>;
  to?: Maybe<Scalars['Float']['output']>;
};

export type RecommendationsData = {
  __typename?: 'RecommendationsData';
  count?: Maybe<Scalars['Int']['output']>;
  relatedDocuments?: Maybe<Array<Maybe<RelatedDocument>>>;
  trendingDocuments?: Maybe<Array<Maybe<TrendingDocument>>>;
};


export type RecommendationsDataRelatedDocumentsArgs = {
  docID: Scalars['String']['input'];
  minScore?: InputMaybe<Scalars['Float']['input']>;
  useTrendingBy?: InputMaybe<BoostTrendingBy>;
};


export type RecommendationsDataTrendingDocumentsArgs = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
  trendingBy?: InputMaybe<RecommendationsDataType>;
};

export enum RecommendationsDataType {
  Search = 'search'
}

export type RelatedDocument = {
  __typename?: 'RelatedDocument';
  docID: Scalars['String']['output'];
  score: Scalars['Float']['output'];
  source: Scalars['Map']['output'];
};

export enum Role {
  HybridSearch = 'HYBRID_SEARCH'
}

export enum Semantic_Search_Type {
  Basic = 'BASIC'
}

export type SearchDocument = {
  __typename?: 'SearchDocument';
  /** Document data */
  data: Scalars['Map']['output'];
  /** Search id */
  id: Scalars['ID']['output'];
  /** Search score */
  score?: Maybe<Scalars['Float']['output']>;
  /** Values used by Search to sort documents. Used by cursor pagination */
  sort?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

/** Field to search for in the document */
export type SearchField = {
  /** Field name */
  name: Scalars['String']['input'];
  /** Field weight. It could affect the order the documents are returned */
  weight?: InputMaybe<Scalars['Int']['input']>;
};

/** Search Option Input */
export type SearchOption = {
  /** Optional Fuzzy Distance */
  fuzzyDistance?: InputMaybe<Scalars['Int']['input']>;
  /** Search option name */
  name?: SearchOptionEnum;
};

export enum SearchOptionEnum {
  Fuzzy = 'fuzzy',
  Stemming = 'stemming'
}

/** A search result hit. */
export type SearchResult = {
  __typename?: 'SearchResult';
  aggregations?: Maybe<AggregateOutput>;
  /** Document data. */
  documents: Array<Maybe<SearchDocument>>;
  /** Total document number returned. */
  total?: Maybe<Scalars['Int']['output']>;
};

export type SearchTermData = {
  __typename?: 'SearchTermData';
  numberOfSearches: Scalars['Int']['output'];
  term: Scalars['String']['output'];
};

export type SemanticSearchConfig = {
  __typename?: 'SemanticSearchConfig';
  chunking?: Maybe<ChunkingConfigType>;
  fields: Array<Scalars['String']['output']>;
  type?: Maybe<Semantic_Search_Type>;
};

/** Semantic Search query input */
export type SemanticSearchInput = {
  /** Fields for search */
  fields: Array<Scalars['String']['input']>;
  /**
   * The search bias of the semantic search query vs full text search
   * - 0 = Full text search only, 10 = Semantic search only
   * - 1-9 mix of both weighted respectfully
   */
  searchBias: Scalars['Int']['input'];
  /** Semantic Search type */
  type?: InputMaybe<Semantic_Search_Type>;
};

export type SimilarityInput = {
  filter?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  minScore?: InputMaybe<Scalars['Float']['input']>;
  nearest: NearestInput;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type SimilarityOutput = {
  __typename?: 'SimilarityOutput';
  docs: Array<Maybe<Doc>>;
  total: Scalars['Int']['output'];
};

export type TermAggregateInput = {
  field: Scalars['String']['input'];
  minCount?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type TermAggregateOutput = {
  __typename?: 'TermAggregateOutput';
  field: Scalars['String']['output'];
  terms?: Maybe<Array<Maybe<TermOutput>>>;
};

export type TermOutput = {
  __typename?: 'TermOutput';
  count: Scalars['Int']['output'];
  term: Scalars['String']['output'];
};

export type TrendingDocument = {
  __typename?: 'TrendingDocument';
  count: Scalars['Int']['output'];
  docID: Scalars['String']['output'];
  source: Scalars['Map']['output'];
};

export type SimilaritySearchQueryVariables = Exact<{
  input: SimilarityInput;
}>;


export type SimilaritySearchQuery = { __typename?: 'Query', similarity?: { __typename?: 'SimilarityOutput', total: number, docs: Array<{ __typename?: 'Doc', id: string, score?: number | null, data: any, innerDocs: Array<{ __typename?: 'InnerDocs', field: string, docs: Array<{ __typename?: 'Doc', id: string, score?: number | null, data: any } | null> } | null> } | null> } | null };


export const SimilaritySearchDocument = gql`
    query SimilaritySearch($input: SimilarityInput!) {
  similarity(input: $input) {
    total
    docs {
      id
      score
      data
      innerDocs {
        field
        docs {
          id
          score
          data
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const SimilaritySearchDocumentString = print(SimilaritySearchDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    SimilaritySearch(variables: SimilaritySearchQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: SimilaritySearchQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<SimilaritySearchQuery>(SimilaritySearchDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SimilaritySearch', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;