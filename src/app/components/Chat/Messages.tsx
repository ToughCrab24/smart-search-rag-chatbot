import { Message } from "ai";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import WeatherCard from "../WeatherCard";

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessageContent = (msg: Message) => {
    return (
      <div>
        <ReactMarkdown>{msg.content}</ReactMarkdown>

        {/* Render tool invocations */}
        <div>
          {msg.toolInvocations?.map((toolInvocation) => {
            const { toolName, toolCallId, state } = toolInvocation;

            if (state === "result") {
              if (toolName === "displayWeather") {
                const { result } = toolInvocation;
                return (
                  <div key={toolCallId}>
                    <WeatherCard weather={result} />
                  </div>
                );
              }
            } else {
              return (
                <div key={toolCallId}>
                  {toolName === "displayWeather" ? (
                    <div className="flex items-center space-x-2 my-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                      <span className="text-gray-300">Loading weather...</span>
                    </div>
                  ) : null}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  };

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
            {renderMessageContent(msg)}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
