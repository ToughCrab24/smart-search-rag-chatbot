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
      className="border-1 border-gray-100 overflow-y-scroll flex-grow flex-col justify-end p-1"
      style={{ scrollbarWidth: "none" }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.role === "assistant" ? "bg-green-500" : "bg-blue-500"
          } my-2 p-3 shadow-md hover:shadow-lg transition-shadow duration-200 flex slide-in-bottom bg-blue-500 border border-gray-900 message-glow`}
        >
          <div className="ml- rounded-tl-lg  p-2 border-r flex items-center">
            {msg.role === "assistant" ? "🤖" : "🧅"}
          </div>
          <div className="ml-2 text-white">
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
