"use client";

export default function LoadingCard() {
  return (
    <div className="w-full p-4 my-2 bg-white rounded-lg shadow-md dark:bg-gray-800 animate-pulse">
      <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-1/2 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
      <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-5/6 mt-1"></div>
    </div>
  );
}
