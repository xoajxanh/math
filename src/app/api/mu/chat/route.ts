import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'mu_chat.json');

interface ChatMessage {
  id: string;
  characterName: string;
  message: string;
  timestamp: number;
}

export async function GET(req: Request) {
  try {
    let messages: ChatMessage[] = [];
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8');
      messages = JSON.parse(data) || [];
    } catch (e) {
      // File may not exist yet
    }

    const { searchParams } = new URL(req.url);
    const beforeStr = searchParams.get('before');
    const afterStr = searchParams.get('after');

    let result = messages;

    if (beforeStr) {
      const before = parseInt(beforeStr, 10);
      result = messages.filter(m => m.timestamp < before).slice(-10);
    } else if (afterStr) {
      const after = parseInt(afterStr, 10);
      result = messages.filter(m => m.timestamp > after);
    } else {
      result = messages.slice(-10);
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error("Error reading chat data:", e);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { characterName, message } = body;

    if (!characterName || !message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    let messages: ChatMessage[] = [];
    try {
      const data = await fs.readFile(dataFilePath, 'utf-8');
      messages = JSON.parse(data) || [];
    } catch (e) {
      // File may not exist yet
    }

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      characterName: characterName.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    messages.push(newMessage);

    // Ensure data directory exists
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, JSON.stringify(messages, null, 2), 'utf-8');

    return NextResponse.json(newMessage);
  } catch (e) {
    console.error("Error saving chat message:", e);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
