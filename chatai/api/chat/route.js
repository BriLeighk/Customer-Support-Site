import { NextResponse } from "next/server"
import OpenAI from 'openai'

const systemPrompt = 'You are an AI-powered customer support assistant for HeadStartAI, a platform that provides AI-driven interviews for software enginners. some points to consider are : 1.HeadstartAI offers AI-powered interviews for software engineering positions. 2. Our platform helps candidates practice and prepare for real job interviews. 3. We cover a wide rnge of topics including algorithms , data structures , system design and behavioural questions. 4. Users can acess our services through website. 5.If asked about technical issues, guide users to our troubleshooting page or suggest contacting our technical support team.'

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role:'system',
                content:systemPrompt,
            },
            ...data,
        ],
        model:'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    
    return new NextResponse(stream)
}