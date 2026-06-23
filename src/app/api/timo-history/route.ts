import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ÄÆ°á»ng dáº«n lÆ°u file history.json trong thÆ° má»¥c data á»Ÿ thÆ° má»¥c gá»‘c cá»§a dá»± Ã¡n
const dataDirPath = path.join(process.cwd(), "data");
const historyFilePath = path.join(dataDirPath, "timo-history.json");

// Äá»c dá»¯ liá»‡u tá»« file
function readHistoryData(): any[] {
  try {
    if (!fs.existsSync(historyFilePath)) {
      return [];
    }
    const content = fs.readFileSync(historyFilePath, "utf-8");
    if (!content.trim()) return [];
    return JSON.parse(content);
  } catch (error) {
    console.error("Lá»—i khi Ä‘á»c file lá»‹ch sá»­ lÃ m bÃ i:", error);
    return [];
  }
}

// Ghi dá»¯ liá»‡u vÃ o file
function writeHistoryData(data: any[]): boolean {
  try {
    // Táº¡o thÆ° má»¥c data náº¿u chÆ°a tá»“n táº¡i
    if (!fs.existsSync(dataDirPath)) {
      fs.mkdirSync(dataDirPath, { recursive: true });
    }
    fs.writeFileSync(historyFilePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Lá»—i khi ghi file lá»‹ch sá»­ lÃ m bÃ i:", error);
    return false;
  }
}

// GET API: Láº¥y danh sÃ¡ch lá»‹ch sá»­
export async function GET() {
  const historyList = readHistoryData();
  return NextResponse.json(historyList);
}

// POST API: LÆ°u má»™t lÆ°á»£t ná»™p bÃ i má»›i
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Kiá»ƒm tra dá»¯ liá»‡u Ä‘áº§u vÃ o cÆ¡ báº£n
    if (!payload.studentName || typeof payload.score !== "number" || !Array.isArray(payload.questions)) {
      return NextResponse.json(
        { error: "Dá»¯ liá»‡u bÃ i ná»™p khÃ´ng Ä‘áº§y Ä‘á»§ hoáº·c khÃ´ng há»£p lá»‡" },
        { status: 400 }
      );
    }

    const currentHistory = readHistoryData();

    // Táº¡o báº£n ghi bÃ i ná»™p má»›i
    const newRecord = {
      id: payload.id || `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentName: payload.studentName,
      timestamp: payload.timestamp || new Date().toISOString(),

      grade: payload.grade,
      round: payload.round,
      testIndex: payload.testIndex,
      score: payload.score,
      total: payload.total || payload.totalQuestions,
      duration: typeof payload.duration === "number" ? payload.duration : undefined,
      questions: payload.questions.map((q: any) => ({
        id: q.id,
        category: q.category,
        questionEn: q.questionEn,
        questionVn: q.questionVn,
        imageUrl: q.imageUrl,
        options: q.options,
        optionImages: q.optionImages,
        userAnswer: q.userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect: q.isCorrect,
      })),
    };

    // ThÃªm vÃ o Ä‘áº§u máº£ng Ä‘á»ƒ cÃ¢u há»i má»›i ná»™p hiá»ƒn thá»‹ trÆ°á»›c tiÃªn
    currentHistory.unshift(newRecord);

    const success = writeHistoryData(currentHistory);
    if (!success) {
      return NextResponse.json({ error: "KhÃ´ng thá»ƒ lÆ°u dá»¯ liá»‡u vÃ o há»‡ thá»‘ng" }, { status: 500 });
    }

    return NextResponse.json({ success: true, recordId: newRecord.id });
  } catch (error: any) {
    console.error("Lá»—i xá»­ lÃ½ POST history API:", error);
    return NextResponse.json({ error: error.message || "Lá»—i mÃ¡y chá»§ ná»™i bá»™" }, { status: 500 });
  }
}

// DELETE API: XÃ³a toÃ n bá»™ danh sÃ¡ch lá»‹ch sá»­
export async function DELETE() {
  try {
    const success = writeHistoryData([]);
    if (!success) {
      return NextResponse.json({ error: "KhÃ´ng thá»ƒ xÃ³a dá»¯ liá»‡u trÃªn há»‡ thá»‘ng" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lá»—i xá»­ lÃ½ DELETE history API:", error);
    return NextResponse.json({ error: error.message || "Lá»—i mÃ¡y chá»§ ná»™i bá»™" }, { status: 500 });
  }
}
