import { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function deepParseJson(value: unknown): unknown {
  if (typeof value === "string") {
    try {
      return deepParseJson(JSON.parse(value));
    } catch {
      return value;
    }
  }
  if (Array.isArray(value)) {
    return value.map(deepParseJson);
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepParseJson(v)])
    );
  }
  return value;
}

function formatResult(result: unknown): string {
  const parsed = deepParseJson(result);
  return typeof parsed === "string" ? parsed : JSON.stringify(parsed, null, 2);
}

function ToolIndicator({
  toolName,
  pending,
  result,
}: {
  toolName: string;
  pending: boolean;
  result?: unknown;
}) {
  const label = pending ? `Using ${toolName}...` : `Used ${toolName}`;

  return (
    <details className="mt-2 text-sm">
      <summary className="flex items-center gap-2 text-gray-400 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        {pending ? (
          <svg
            className="animate-spin h-4 w-4 shrink-0 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 shrink-0 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
        <span>{label}</span>
      </summary>
      {result != null && (
        <pre className="mt-1 ml-6 p-2 bg-slate-800 rounded text-xs text-gray-300 max-h-48 overflow-auto whitespace-pre-wrap break-words">
          {formatResult(result)}
        </pre>
      )}
    </details>
  );
}

export default function Messages({ messages }: { messages: UIMessage[] }) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="overflow-y-scroll overflow-x-hidden flex-grow p-1"
      style={{ scrollbarWidth: "none" }}
    >
      {messages.map((msg, index) => {
        const toolParts = msg.parts.filter(
          (p) => p.type === "tool-invocation"
        );

        return (
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
            <div className="ml-2 min-w-0 overflow-hidden text-gray-100">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
              {toolParts.map((p) => (
                <ToolIndicator
                  key={p.toolInvocation.toolCallId}
                  toolName={p.toolInvocation.toolName}
                  pending={
                    p.toolInvocation.state === "call" ||
                    p.toolInvocation.state === "partial-call"
                  }
                  result={
                    p.toolInvocation.state === "result"
                      ? p.toolInvocation.result
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
