import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Đường dẫn lưu file history.json trong thư mục data ở thư mục gốc của dự án
const dataDirPath = path.join(process.cwd(), "data");
const historyFilePath = path.join(dataDirPath, "history.json");

// Đọc dữ liệu từ file
function readHistoryData(): any[] {
  try {
    if (!fs.existsSync(historyFilePath)) {
      return [];
    }
    const content = fs.readFileSync(historyFilePath, "utf-8");
    if (!content.trim()) return [];
    return JSON.parse(content);
  } catch (error) {
    console.error("Lỗi khi đọc file lịch sử làm bài:", error);
    return [];
  }
}

// Ghi dữ liệu vào file
function writeHistoryData(data: any[]): boolean {
  try {
    // Tạo thư mục data nếu chưa tồn tại
    if (!fs.existsSync(dataDirPath)) {
      fs.mkdirSync(dataDirPath, { recursive: true });
    }
    fs.writeFileSync(historyFilePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Lỗi khi ghi file lịch sử làm bài:", error);
    return false;
  }
}

// GET API: Lấy danh sách lịch sử
export async function GET() {
  const historyList = readHistoryData();
  return NextResponse.json(historyList);
}

// POST API: Lưu một lượt nộp bài mới
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!payload.studentName || typeof payload.score !== "number" || !Array.isArray(payload.questions)) {
      return NextResponse.json(
        { error: "Dữ liệu bài nộp không đầy đủ hoặc không hợp lệ" },
        { status: 400 }
      );
    }

    const currentHistory = readHistoryData();

    // Tạo bản ghi bài nộp mới
    const newRecord = {
      id: payload.id || `hist-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentName: payload.studentName,
      timestamp: payload.timestamp || new Date().toISOString(),
      operator: payload.operator,
      range: payload.range,
      score: payload.score,
      total: payload.total,
      duration: typeof payload.duration === "number" ? payload.duration : undefined,
      questions: payload.questions.map((q: any) => ({
        x: q.x,
        y: q.y,
        op: q.op,
        answer: q.answer,
        userAnswer: q.userAnswer,
        isCorrect: q.isCorrect,
      })),
    };

    // Thêm vào đầu mảng để câu hỏi mới nộp hiển thị trước tiên
    currentHistory.unshift(newRecord);

    const success = writeHistoryData(currentHistory);
    if (!success) {
      return NextResponse.json({ error: "Không thể lưu dữ liệu vào hệ thống" }, { status: 500 });
    }

    return NextResponse.json({ success: true, recordId: newRecord.id });
  } catch (error: any) {
    console.error("Lỗi xử lý POST history API:", error);
    return NextResponse.json({ error: error.message || "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}

// DELETE API: Xóa toàn bộ danh sách lịch sử
export async function DELETE() {
  try {
    const success = writeHistoryData([]);
    if (!success) {
      return NextResponse.json({ error: "Không thể xóa dữ liệu trên hệ thống" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lỗi xử lý DELETE history API:", error);
    return NextResponse.json({ error: error.message || "Lỗi máy chủ nội bộ" }, { status: 500 });
  }
}
