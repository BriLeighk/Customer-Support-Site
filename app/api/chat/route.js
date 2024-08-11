import { NextResponse } from 'next/server';

const systemPrompt = "An AI-powered customer support tool for HeadStartAI, a platform that provides AI-driven interviews for software engineers.";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Request data:', data);

    const apiKey = process.env.HUGGINGFACE_API_KEY;

    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: data.messages.map(msg => msg.content).join('\n'),
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Hugging Face API:', errorText);
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Response from Hugging Face API:', result);

    // Check the structure of the response and extract the appropriate content
    const content = result.generated_text || result[0]?.generated_text || "No response generated";

    return NextResponse.json({ content });
  } catch (err) {
    console.error('Error in POST request:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}