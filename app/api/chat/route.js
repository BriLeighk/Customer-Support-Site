import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    candidateCount: 1,
    temperature: 1.0,
  },
});

export async function POST(request) {
  try {
    const { messages } = await request.json();
    const userMessage = messages[messages.length - 1].content;

    const systemPrompt = `
      You are a customer support agent to help the user with anything they need.
      User: ${userMessage}
    `;
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const content = await response.text();

    // Convert the content to HTML using marked
    const rawHtml = marked(content);

    // Sanitize the HTML to ensure it's safe to render
    const sanitizedHtml = sanitizeHtml(rawHtml);

    return NextResponse.json({ content: sanitizedHtml });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ content: "Error: Please try again." }, { status: 500 });
  }
}