"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { type Message } from "ai";

interface SummaryCardProps {
  isLoading: boolean;
  assistantMessage: Message | undefined;
  messages: Message[];
}

export default function SummaryCard({
  isLoading,
  assistantMessage,
  messages,
}: SummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isLoading && !assistantMessage) {
    return null;
  }

  return (
    <div
      className={`mt-4 rounded-lg relative p-1 overflow-hidden ${
        isLoading
          ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 [background-size:400%_400%] animate-border-snake"
          : ""
      }`}
    >
      <div
        className={`relative p-4 text-gray-900 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-500 ${
          assistantMessage ? "cursor-pointer" : ""
        } ${
          isExpanded || !assistantMessage ? "h-auto" : "h-32 overflow-hidden"
        }`}
        onClick={() => assistantMessage && setIsExpanded(!isExpanded)}
      >
        {assistantMessage ? (
          <>
            <div className="prose dark:prose-invert max-w-none">
              {messages.map(
                (m) =>
                  m.role === "assistant" && (
                    <div key={m.id}>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )
              )}
            </div>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 dark:from-gray-700 to-transparent flex items-center justify-center">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Click to expand
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Generating summary...</p>
          </div>
        )}
      </div>
    </div>
  );
}