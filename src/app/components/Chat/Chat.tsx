"use client";

import React, { ChangeEvent } from "react";
import Messages from "./Messages";
import { UIMessage } from "ai";
import LoadingIcon from "../Icons/LoadingIcon";
import ChatInput from "./ChatInput";

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  messages: UIMessage[];
  status: "submitted" | "streaming" | "ready" | "error";
}

const Chat: React.FC<Chat> = ({
  input,
  handleInputChange,
  handleMessageSubmit,
  messages,
  status,
}) => {
  return (
    <div id="chat" className="flex flex-col w-full mx-2">
      <Messages messages={messages} />
      {status === "submitted" && <LoadingIcon />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const sanitized = input
            .replace(/[<>{}]/g, "")
            .replace(/javascript:/gi, "")
            .trim();
          if (!sanitized) return;
          handleMessageSubmit(e);
        }}
        className="ml-1 mt-5 mb-5 relative rounded-lg"
      >
        <ChatInput input={input} handleInputChange={handleInputChange} />
      </form>
    </div>
  );
};

export default Chat;
