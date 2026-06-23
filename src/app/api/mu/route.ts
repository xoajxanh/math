import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'mu_data.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json({ bossStates: {}, mapSettings: {} });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    
    // Read existing data to merge or just overwrite
    // We will just overwrite to keep it simple, assuming client sends the full state
    await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Lỗi save mu_data:", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
