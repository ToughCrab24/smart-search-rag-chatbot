import { convertToCoreMessages, Message, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { smartSearchTool } from "@/app/utils/tools";

export const runtime = "edge";

const google = createGoogleGenerativeAI();

const systemPrompt = `
You are an advanced search summarization engine designed to provide concise,
Overviews of search results from the user's website.
Your output must always be rendered in Markdown for front-end parsing and not include the backticks in ouput.

Instructions:

1. Execute Search: You must use the 'smartSearchTool' to query the website for relevant information.

2. Summarization Objective: Generate a well-formatted, comprehensive summary that captures the essence of the search results, similar to a "Featured Snippet" or "People Also Ask" response.

3. Content Structure:
  - Employ a clear hierarchy using Markdown headings (e.g., #, ##, ###).
  - Use bullet points (* or -) and numbered lists (1., 2.) where appropriate to present information concisely.
  - Bold key terms, show titles, and important details for emphasis.
  - For every show or significant entity mentioned, include a direct reference link using the 'url' provided in the 'smartSearchTool''s output. The link should be embedded within the relevant text (e.g., [Show Title](url)).

4. No Results Handling: If the 'smartSearchTool' returns no relevant information, output only the precise phrase: "No information found."

5. Output Constraints:
  - Do not include any conversational pleasantries, introductions, or extraneous text.
  - Do not output JSON or any other structured data format besides Markdown.
  - Prioritize clarity and brevity. Avoid jargon or overly technical language unless it's inherent to the content itself.
`;

export async function POST(req: Request) {
  const { messages }: { messages: Array<Message> } = await req.json();

  const result = streamText({
    model: google("models/gemini-2.0-flash"),
    system: systemPrompt,
    messages: convertToCoreMessages(messages),
    tools: {
      smartSearchTool,
    },
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
