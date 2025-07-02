
import React from 'react';
import SearchResultCard from './SearchResultCard';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  categories: string[];
  searchScore: number;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map(result => (
          <SearchResultCard key={result.id} result={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
