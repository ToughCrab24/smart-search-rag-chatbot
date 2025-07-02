"use client";

import { useChat } from "@ai-sdk/react";
import { FormEvent } from "react";

import SearchResults from "../components/Search/SearchResults";
import SummaryCard from "../components/Search/SummaryCard";
import SearchForm from "../components/Search/SearchForm";

export default function SearchPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({
    api: "/api/summarize",
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([]);
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

  const assistantMessage = messages.find((m) => m.role === "assistant");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-5xl p-8 space-y-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Summarize Search Results
        </h1>
        <SearchForm
          input={input}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />

        <SummaryCard
          isLoading={isLoading}
          assistantMessage={assistantMessage}
          messages={messages}
        />

        <SearchResults results={searchResults} isLoading={isLoading} />
      </div>
    </div>
  );
}
