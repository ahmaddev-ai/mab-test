import { Message } from "@/types/chatbot";
import { SYSTEM_PROMPT } from "@/lib/prompt";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const messages: Message[] = Array.isArray(body.messages)
      ? body.messages
      : [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 }
      );
    }

    // Send ONLY the latest message to Gemini
    const latestMessage = messages[messages.length - 1];

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: latestMessage.content,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",

      contents,

      config: {
        systemInstruction: SYSTEM_PROMPT,

        thinkingConfig: {
          thinkingBudget: 0,
        },

        maxOutputTokens: 400,
        temperature: 0.2,
      },
    });

    const reply =
      response.text?.trim() ||
      "Sorry, I couldn't generate a response right now.";

    console.log("Gemini Reply:", reply);
    console.log("Finish Reason:", response.candidates?.[0]?.finishReason);
    console.log("Usage:", response.usageMetadata);

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Gemini Chat Error:", error);

    return NextResponse.json(
      { error: "Unable to process your message." },
      { status: 500 }
    );
  }
}
