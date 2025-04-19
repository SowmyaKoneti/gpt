import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { message } = await req.json();
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',

        },
        body: JSON.stringify({
            model: 'llama3-70b-8192',
            messages: [
                {
                    role: 'system',
                    content: `
                    You are a helpful and informative AI assistant. Respond to user questions clearly and concisely. Provide factual information and avoid overly enthusiastic or conversational language. When explaining concepts, use simple terms but maintain a professional tone. If appropriate, add emojis to make the response feel alive!
                    `,
                },
                {
                    role: 'user',
                    content: message,
                },

            ],
        }
        )
    })

    const data = await res.json();
    return NextResponse.json({
        reply: data.choices?.[0]?.message?.content || 'no response from model',
    })

}