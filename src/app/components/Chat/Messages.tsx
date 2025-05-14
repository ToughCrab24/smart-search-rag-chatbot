import { Message } from "ai";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div
      className="overflow-y-scroll flex-grow p-1"
      style={{ scrollbarWidth: "none" }}
    >
      {messages.map((msg, index) => (
        <div
          key={msg.id || index}
          className={`${
            msg.role === "assistant"
              ? "bg-slate-700 w-full " // Assistant: full width
              : "bg-blue-700 ml-auto w-fit" // User: fit content width, right aligned
          } my-2 p-3 my-5  hover:shadow-lg transition-shadow duration-200 flex items-center rounded-lg`}
        >
          <div className="p-2 border-r self-stretch">
            {msg.role === "assistant" ? "🤖" : "🧒🏻"}
          </div>
          <div
            className={`ml-2 ${
              msg.role === "assistant" ? "text-gray-100" : "text-gray-100"
            }`}
          >
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
