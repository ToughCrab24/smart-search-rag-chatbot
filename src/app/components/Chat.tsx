"use client";

import React, { ChangeEvent } from "react";
import Messages from "./Messages";
import { Message } from "ai/react";

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
    />
  </svg>
);

// Placeholder for the Gemini Logo - REPLACE THIS with the actual Gemini logo SVG
const GeminiLogoPlaceholder = ({ className }: { className: string }) => (
  // Placeholder for the Gemini Logo - REPLACE THIS with the actual Gemini logo SVG
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: "#7050F0" }} />{" "}
        <stop offset="100%" style={{ stopColor: "#50D0F0" }} />{" "}
      </linearGradient>
    </defs>
    <path
      fill="url(#starGradient)"
      d="M12,0 Q17,7 24,12 Q17,17 12,24 Q7,17 0,12 Q7,7 12,0 Z"
    />
  </svg>
);

interface InputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ input, handleInputChange }: InputProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={"Ask Smart Search about TV shows..."}
        className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none text-md mb-3"
      />
      <div className="flex">
        {/* Left side: Powered by Gemini */}
        <div className="flex items-center text-xs text-gray-500">
          <GeminiLogoPlaceholder className="w-4 h-4 mr-2 text-blue-400" />{" "}
          {/* Adjust color and size as needed */}
          <span>
            Powered by <span className="gemini-text">Gemini</span>
          </span>
        </div>
        <button
          type="submit"
          className="p-1 hover:bg-gray-700 rounded-md transition-colors ml-auto"
          aria-label="Send message"
          disabled={!input.trim()} // Optionally disable if input is empty
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  messages: Message[];
}

const Chat: React.FC<Chat> = ({
  input,
  handleInputChange,
  handleMessageSubmit,
  messages,
}) => {
  return (
    <div id="chat" className="flex flex-col w-full mx-2">
      <Messages messages={messages} />
      <form
        onSubmit={handleMessageSubmit}
        className="ml-1 mt-5 mb-5 relative rounded-lg"
      >
        <Input input={input} handleInputChange={handleInputChange} />
      </form>
    </div>
  );
};

export default Chat;
