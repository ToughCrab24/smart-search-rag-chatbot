import { ChangeEvent } from "react";
import SendIcon from "../Icons/SendIcon";
import GeminiIcon from "../Icons/GeminiIcon";

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
        <div className="flex items-center text-xs text-gray-500">
          <GeminiIcon className="w-4 h-4 mr-2 text-blue-400" />{" "}
          <span>
            Powered by <span className="gemini-text">Gemini</span>
          </span>
        </div>
        <button
          type="submit"
          className="p-1 hover:bg-gray-700 rounded-md transition-colors ml-auto"
          aria-label="Send message"
          disabled={!input.trim()}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default Input;
