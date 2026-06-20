import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import os from "os";
// @ts-ignore
import ffmpegStatic from "ffmpeg-static";

const execFileAsync = promisify(execFile);

let ffmpegFullPath = ffmpegStatic ? ffmpegStatic.replace("ROOT", process.cwd()) : "";
if (ffmpegFullPath.startsWith("\\")) {
  ffmpegFullPath = ffmpegFullPath.slice(1);
}
ffmpegFullPath = path.normalize(ffmpegFullPath);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const sentence = formData.get("sentence") as string;
    const sessionId = formData.get("sessionId") as string | null;
    const questionId = formData.get("questionId") as string | null;

    if (!file || !sentence) {
      return NextResponse.json({ error: "Thiếu dữ liệu âm thanh hoặc câu mẫu." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const wavBuffer = await convertToWav(buffer);

    const config = {
      ReferenceText: sentence,
      GradingSystem: "HundredMark",
      Granularity: "Phoneme",
      Dimension: "Comprehensive",
      EnableMiscue: true,
    };

    const base64Config = Buffer.from(JSON.stringify(config)).toString("base64");

    const key = process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
    if (!key) {
      return NextResponse.json({ error: "Không tìm thấy cấu hình API Key Azure." }, { status: 500 });
    }

    const res = await fetch(
      "https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US",
      {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Content-Type": "audio/wav",
          Accept: "application/json",
          "Pronunciation-Assessment": base64Config,
        },
        body: new Uint8Array(wavBuffer),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: "Azure API trả về lỗi: " + errorText }, { status: res.status });
    }

    const data = await res.json();

    // Save audio file and update history if session info is provided
    if (sessionId && questionId) {
      try {
        const audioDir = path.join(process.cwd(), "public", "audio", "english");
        if (!fs.existsSync(audioDir)) {
          fs.mkdirSync(audioDir, { recursive: true });
        }
        const audioFilePath = path.join(audioDir, `${sessionId}-${questionId}.wav`);
        fs.writeFileSync(audioFilePath, wavBuffer);

        const engHistoryFilePath = path.join(process.cwd(), "data", "english_history.json");
        if (fs.existsSync(engHistoryFilePath)) {
          const content = fs.readFileSync(engHistoryFilePath, "utf-8");
          const historyList = content ? JSON.parse(content) : [];
          const session = historyList.find((s: any) => s.id === sessionId);
          if (session) {
            const questionIdx = parseInt(questionId, 10);
            const question = session.questions.find((q: any) => q.id === questionIdx);
            if (question) {
              question.score = data;
              question.audioUrl = `/audio/english/${sessionId}-${questionId}.wav`;
              fs.writeFileSync(engHistoryFilePath, JSON.stringify(historyList, null, 2), "utf-8");
            }
          }
        }
      } catch (err) {
        console.error("Lỗi khi lưu file âm thanh hoặc cập nhật lịch sử Tiếng Anh:", err);
      }
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Lỗi khi chấm điểm phát âm:", error);
    return NextResponse.json({ error: error.message || "Lỗi hệ thống." }, { status: 500 });
  }
}

async function convertToWav(inputBuffer: Buffer): Promise<Buffer> {
  const inputPath = path.join(os.tmpdir(), `input-${Date.now()}.webm`);
  const outputPath = path.join(os.tmpdir(), `output-${Date.now()}.wav`);

  fs.writeFileSync(inputPath, inputBuffer);

  await execFileAsync(ffmpegFullPath, [
    "-y",
    "-i", inputPath,
    "-ac", "1",
    "-ar", "16000",
    "-acodec", "pcm_s16le",
    outputPath,
  ]);

  const wavBuffer = fs.readFileSync(outputPath);

  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPath);

  return wavBuffer;
}
