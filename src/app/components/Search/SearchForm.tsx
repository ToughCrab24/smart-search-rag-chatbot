"use client";

import { FormEvent } from "react";

interface SearchFormProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({
  input,
  handleInputChange,
  handleFormSubmit,
}: SearchFormProps) {
  return (
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
  );
}
