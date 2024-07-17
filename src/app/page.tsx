"use client";
import Chat from "./components/Chat";
import { useChat } from "ai/react";
import { useEffect } from "react";

const Page: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat();

  useEffect(() => {
    if (messages.length < 1) {
      setMessages([
        {
          role: "assistant",
          content: "Welcome to the Smart Search chatbot!",
          id: "welcome",
        },
      ]);
    }
  }, [messages, setMessages]);

  return (
    <div className="flex flex-col justify-between h-screen bg-white mx-auto max-w-full">
      <div className="flex w-full flex-grow overflow-hidden relative">
        <Chat
          input={input}
          handleInputChange={handleInputChange}
          handleMessageSubmit={handleSubmit}
          messages={messages}
        />
      </div>
    </div>
  );
};

export default Page;
