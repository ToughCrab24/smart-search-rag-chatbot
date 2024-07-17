"use client";

import React, { ChangeEvent } from "react";
import Messages from "./Messages";
import { Message } from "ai/react";

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
        className="ml-1 mt-5 mb-5 relative bg-gray-500 rounded-lg"
      >
        <input
          type="text"
          className="input-glow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-10 bg-gray-100 border-gray-100 transition-shadow duration-200"
          value={input}
          onChange={handleInputChange}
        />

        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
          Press ⮐ to send
        </span>
      </form>
    </div>
  );
};

export default Chat;
