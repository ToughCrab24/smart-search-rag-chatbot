import React from "react";
import SearchResultCard from "./SearchResultCard";
import LoadingCard from "./LoadingCard";

interface SearchResultsProps {
  results: any[];
  isLoading: boolean;
}

export default function SearchResults({
  results,
  isLoading,
}: SearchResultsProps) {
  if (isLoading && results.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Searching...
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4">
          {[...Array(3)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Search Results
      </h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {results.map((result: any, index: number) => (
          <SearchResultCard key={index} result={result} />
        ))}
      </div>
    </div>
  );
}
