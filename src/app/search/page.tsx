"use client";

import { useChat } from "ai/react";
import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";

import SearchResults from "../components/Search/SearchResults";

export default function SearchPage() {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
      api: "/api/summarize",
    });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([]);
    setIsExpanded(false);
    handleSubmit(e);
  };

  const searchResults = messages.reduce((acc, msg) => {
    if (msg.role === "assistant" && msg.parts) {
      for (const part of msg.parts) {
        if (
          part.type === "tool-invocation" &&
          "result" in part.toolInvocation &&
          (part.toolInvocation.result as any)?.searchResults
        ) {
          acc.push(...(part.toolInvocation.result as any).searchResults);
        }
      }
    }
    return acc;
  }, [] as any[]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-5xl p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Summarize Search Results
        </h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              name="search"
              type="text"
              required
              className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your search query..."
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Summarize
          </button>
        </form>

        {messages.find((m) => m.role === "assistant") && (
          <div
            className={`relative p-4 mt-4 text-gray-900 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-white cursor-pointer transition-all duration-500 ${
              isExpanded ? "h-auto" : "h-32 overflow-hidden"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className={`prose dark:prose-invert max-w-none`}>
              {messages.map((m) => (
                <div key={m.id}>
                  {m.role === "assistant" && (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  )}
                </div>
              ))}
            </div>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 dark:from-gray-700 to-transparent flex items-center justify-center">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Click to expand
                </p>
              </div>
            )}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="mt-8">
            <SearchResults results={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
}
