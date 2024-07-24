// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { getContext } from "@/app/utils/context";

/**
 * Initialize the OpenAI API
 */
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Get the last message
    const lastMessage = messages[messages.length - 1];

    // Get the last 10 messages not including the latest
    const previousMessages = messages.slice(-11, -1);

    // Get the context from the last message
    const context = await getContext(lastMessage.content);

    // Map the context into a friendly text stream
    const messageContext = context.data.similarity.docs.map((doc: any) => {
      return `
        ID: ${doc.id}
        Title: ${doc.data.post_title}
        Content: ${doc.data.post_content}
        SearchScore: ${doc.score}
      `;
    });

    const prompt: CoreMessage = {
      role: "assistant",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of WP Engine Smart Search.
      AI assistant uses WP Engine Smart Search to provide the most accurate and relevant information to the user.
      AI assistant data from WP Engine Smart Search is based on TV Shows.
      START CONTEXT BLOCK
      ${messageContext.join("----------------\n\n")}
      END OF CONTEXT BLOCK

      START OF HISTORY BLOCK
      ${JSON.stringify(previousMessages)}
      END OF HISTORY BLOCK
      AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      AI assistant will take into account any HISTORY BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      AI assistant will answer coding questions.
      `,
    };

    const response = await streamText({
      model: openai("gpt-4o"),
      messages: [
        prompt,
        ...messages.filter((message: CoreMessage) => message.role === "user"),
      ],
    });
    // Convert the response into a friendly text-stream
    return response.toAIStreamResponse();
  } catch (e) {
    throw e;
  }
}
