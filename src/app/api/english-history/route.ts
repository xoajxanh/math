import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Đường dẫn lưu file english_history.json trong thư mục data ở thư mục gốc của dự án
const dataDirPath = path.join(process.cwd(), "data");
const historyFilePath = path.join(dataDirPath, "english_history.json");

// Đọc dữ liệu từ file
function readEnglishHistory(): any[] {
  try {
    if (!fs.existsSync(historyFilePath)) {
      return [];
    }
    const content = fs.readFileSync(historyFilePath, "utf-8");
    if (!content.trim()) return [];
    return JSON.parse(content);
  } catch (error) {
    console.error("Lỗi khi đọc file lịch sử Tiếng Anh:", error);
    return [];
  }
}

// Ghi dữ liệu vào file
function writeEnglishHistory(data: any[]): boolean {
  try {
    if (!fs.existsSync(dataDirPath)) {
      fs.mkdirSync(dataDirPath, { recursive: true });
    }
    fs.writeFileSync(historyFilePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Lỗi khi ghi file lịch sử Tiếng Anh:", error);
    return false;
  }
}

// GET API: Lấy danh sách lịch sử Tiếng Anh
export async function GET() {
  const historyList = readEnglishHistory();
  return NextResponse.json(historyList);
}

// POST API: Khởi tạo/Lưu đề luyện phát âm mới
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload.sessionId || !payload.studentName || !Array.isArray(payload.questions)) {
      return NextResponse.json(
        { error: "Dữ liệu yêu cầu không đầy đủ hoặc không hợp lệ" },
        { status: 400 }
      );
    }

    const currentHistory = readEnglishHistory();

    // Tạo bản ghi session Tiếng Anh mới
    const newRecord = {
      id: payload.sessionId,
      studentName: payload.studentName,
      timestamp: new Date().toISOString(),
      category: payload.category || "word",
      questions: payload.questions.map((q: any) => ({
        id: q.id,
        text: q.text,
        score: null,
        audioUrl: null,
      })),
    };

    // Prepend to display latest session first
    currentHistory.unshift(newRecord);

    const success = writeEnglishHistory(currentHistory);
    if (!success) {
      return NextResponse.json({ error: "Không thể lưu đề vào hệ thống" }, { status: 500 });
    }

    return NextResponse.json({ success: true, sessionId: newRecord.id });
  } catch (error: any) {
    console.error("Lỗi xử lý POST english history API:", error);
    return NextResponse.json({ error: error.message || "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}

// DELETE API: Xóa toàn bộ lịch sử Tiếng Anh
export async function DELETE() {
  try {
    const success = writeEnglishHistory([]);
    if (!success) {
      return NextResponse.json({ error: "Không thể xóa dữ liệu trên hệ thống" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lỗi xử lý DELETE english history API:", error);
    return NextResponse.json({ error: error.message || "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
