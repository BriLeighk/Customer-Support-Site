import { NextResponse } from "next/server"
import OpenAI from "openai";

// const systemPrompt = 'Hello! I’m your AI assistant, ready to help you make the most of your interview practice experience. At Headstarter, we’re dedicated to helping you prepare for technical interviews with real-time, interactive AI sessions. Whether you need help navigating the platform, troubleshooting technical issues, or tips on how to get the most out of your practice, I'm here for you How Can I Assist You Today?
//  Account and Login Issues: Need help with signing up, logging in, or managing your account details?
//  Interview Practice: Have questions about how to start a practice session, or need tips on improving your performance?
//  Technical Problems: Facing issues with the AI interview tool or other site features?
//  Feedback and Suggestions: Want to share your experience or suggest improvements for Headstarter?
//   General Inquiries: Any other questions or information you need about our services? '


export async function POST(req){
    const openai = new OpenAI();
    const data = await req.json()
    console.log(data)

    // const completion = await openai.chat.completions.create({
    //     messages: [{role: "system", content: systemPrompt},
    //         {role: 'user', content: "Who won the world series in 2020?"},
    //         {role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020."},
    //         {role: "user", content: "Where was it played?"}],
    //     model: "gpt-3.5-turbo",
    //   });
    
      console.log(completion.choices[0].message.content);

    return NextResponse.json({message: 'Hello from the server!'})
}
