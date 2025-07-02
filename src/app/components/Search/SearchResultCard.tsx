
import React from 'react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  categories: string[];
  searchScore: number;
}

interface SearchResultCardProps {
  result: SearchResult;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result }) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-md p-4 my-2">
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-bold text-blue-400 hover:underline"
      >
        {result.title}
      </a>
      <p className="text-gray-300 mt-2">{result.content}</p>
      <div className="mt-3">
        {result.categories.map((category, index) => (
          <span
            key={index}
            className="inline-block bg-slate-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mr-2"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SearchResultCard;
