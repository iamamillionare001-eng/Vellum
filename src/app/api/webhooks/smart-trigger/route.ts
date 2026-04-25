import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, platform, senderId } = body;

    const prompt = `Analyze the following message from a user on ${platform}.
    Message: "${message}"
    Determine the user's intent. Classify the intent into one of the following categories:
    - LINK_REQUEST
    - PRICE_INQUIRY
    - GREETING
    - OTHER
    
    Return ONLY a JSON object with the following structure:
    {
      "intent": "LINK_REQUEST" | "PRICE_INQUIRY" | "GREETING" | "OTHER",
      "confidence": 0.0 to 1.0,
      "suggestedResponse": "string"
    }`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });

    const resultText = response.text;
    const intentData = JSON.parse(resultText || '{}');

    return NextResponse.json({
      success: true,
      data: {
        originalMessage: message,
        platform,
        senderId,
        analysis: intentData
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
