import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add timoHistory states
states_injection = """
  // Lịch sử TIMO
  const [timoHistoryList, setTimoHistoryList] = useState<any[]>([]);
  const [selectedTimoHistory, setSelectedTimoHistory] = useState<any | null>(null);
  const [isTimoHistoryOpen, setIsTimoHistoryOpen] = useState<boolean>(false);
"""
content = re.sub(r'(const \[isEnglishHistoryOpen[^;]+;)', r'\1\n' + states_injection, content)

# 2. Add loadTimoHistoryList
funcs_injection = """
  const loadTimoHistoryList = async () => {
    try {
      const res = await fetch("/api/timo-history");
      if (res.ok) {
        const data = await res.json();
        setTimoHistoryList(data);
      }
    } catch (e) {
      console.error("Lỗi khi tải lịch sử TIMO:", e);
    }
  };

  const handleClearTimoHistory = async () => {
    if (confirm("Bé có chắc muốn xóa toàn bộ nhật ký thi TIMO không?")) {
      try {
        const res = await fetch("/api/timo-history", { method: "DELETE" });
        if (res.ok) {
          setTimoHistoryList([]);
          playFeedbackSound("correct");
          alert("Đã xóa sạch nhật ký TIMO của bé rồi nhé! 🎈");
        } else {
          alert("Gặp lỗi khi xóa nhật ký.");
        }
      } catch (e) {
        console.error("Lỗi:", e);
      }
    }
  };
"""
content = re.sub(r'(const loadEnglishHistoryList[^}]+};\n)', r'\1\n' + funcs_injection, content)

# 3. Call loadTimoHistoryList in useEffect
content = re.sub(r'(loadEnglishHistoryList\(\);)', r'\1\n      loadTimoHistoryList();', content)

# 4. Change "Làm Lại" to "Làm Đề"
content = re.sub(r'\{!hasStartedTimo \? "Bắt Đầu Giải Đề TIMO" : "Làm Lại"\}', r'{!hasStartedTimo ? "Bắt Đầu Giải Đề TIMO" : "Làm Đề"}', content)

# 5. Add API POST in handleCheckTimo
api_post = """
    try {
      await fetch("/api/timo-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          grade: timoGrade,
          round: timoRound,
          testIndex: timoTestIndex,
          score: correct,
          total: updated.length,
          questions: updated,
        }),
      });
      loadTimoHistoryList();
    } catch (e) {
      console.error("Lỗi lưu lịch sử TIMO:", e);
    }
"""
content = re.sub(r'(setTimoScore\(correct\);\n)', r'\1\n' + api_post, content)

# 6. Add Nộp Bài button next to Thoát
nop_bai_btn = """
                          {!isTimoChecked && (
                            <button
                              onClick={() => {
                                if (confirm("Bé có chắc chắn muốn nộp bài ngay không?")) {
                                  handleCheckTimo();
                                }
                              }}
                              className="px-3.5 py-1.5 rounded-full bg-emerald-100 border-2 border-slate-900 text-emerald-700 text-xs font-black shadow-[2px_2px_0px_0px_#1e293b] hover:bg-emerald-200 cursor-pointer text-center whitespace-nowrap"
                            >
                              Nộp Bài 💯
                            </button>
                          )}
"""
content = re.sub(r'(<button\n\s*onClick=\{handleStopTimo\})', nop_bai_btn + r'\n                          \1', content)

# 7. Only show English History trigger if englishSubTab === "self"
# We'll change: activeTab === "english" && (
# to: activeTab === "english" && englishSubTab === "self" && (
content = re.sub(r'\{studentName && !isEnglishHistoryOpen && activeTab === "english" && \(', r'{studentName && !isEnglishHistoryOpen && activeTab === "english" && englishSubTab === "self" && (', content)
content = re.sub(r'\{studentName && activeTab === "english" && \(', r'{studentName && activeTab === "english" && englishSubTab === "self" && (', content)

# 8. Add TIMO History Trigger and Drawer
timo_history_ui = """
        {/* Floating TIMO History Trigger Tab */}
        {studentName && !isTimoHistoryOpen && activeTab === "english" && englishSubTab === "timo" && (
          <button
            onClick={() => {
              setIsTimoHistoryOpen(true);
              playPopSound();
            }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-indigo-500 border-l-3 border-t-3 border-b-3 border-slate-900 text-slate-950 font-black py-4 px-2.5 rounded-l-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.15)] flex flex-col items-center gap-1.5 cursor-pointer hover:bg-indigo-400 transition-all select-none group animate-pop"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">🏆</span>
            <span className="text-[10px] uppercase tracking-widest font-black leading-tight flex flex-col items-center">
              {"NHẬT KÝ".split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </span>
          </button>
        )}

        {/* TIMO History Navigation Drawer */}
        {studentName && activeTab === "english" && englishSubTab === "timo" && (
          <div
            className={`fixed top-0 right-0 h-full w-full max-w-md sm:max-w-lg md:max-w-xl bg-white border-l-3 border-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out p-6 flex flex-col ${
              isTimoHistoryOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-4">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <span>🏆</span> Nhật Ký Giải Đề TIMO
              </h3>
              <button
                onClick={() => {
                  setIsTimoHistoryOpen(false);
                  setSelectedTimoHistory(null);
                  playPopSound();
                }}
                className="w-8 h-8 rounded-lg border-2 border-slate-900 bg-rose-400 text-slate-950 font-bold hover:bg-rose-300 transition-all flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                ✕
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto pr-1">
              {selectedTimoHistory ? (
                <div className="animate-pop">
                  <div className="flex items-center gap-2 mb-6">
                    <button
                      onClick={() => {
                        setSelectedTimoHistory(null);
                        playPopSound();
                      }}
                      className="px-3 py-1.5 rounded-lg border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 text-sm font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    >
                      ← Quay lại
                    </button>
                    <div className="text-sm font-bold text-slate-500">Chi tiết bài nộp</div>
                  </div>

                  <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500 block">Thời gian:</span>
                        <span className="font-bold text-slate-800">
                          {new Date(selectedTimoHistory.timestamp).toLocaleString("vi-VN")}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Đề thi:</span>
                        <span className="font-bold text-indigo-700">
                          Khối {selectedTimoHistory.grade} | {selectedTimoHistory.round === "preliminary" ? "Vòng loại" : "Chung kết"} | Đề {selectedTimoHistory.testIndex + 1}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500 block">Kết quả:</span>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-indigo-600">
                            {selectedTimoHistory.score}/{selectedTimoHistory.total}
                          </span>
                          <span className="text-slate-500 font-bold mb-1">câu đúng</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 border-b-2 border-slate-100 pb-2">Danh sách câu hỏi:</h4>
                    {selectedTimoHistory.questions.map((q: any, i: number) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border-2 flex flex-col gap-2 ${
                          q.isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-rose-50 border-rose-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">Câu {i + 1}</span>
                          <span className={`text-xs font-black px-2 py-1 rounded-md ${
                            q.isCorrect ? "bg-emerald-200 text-emerald-800" : "bg-rose-200 text-rose-800"
                          }`}>
                            {q.isCorrect ? "ĐÚNG" : "SAI"}
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 font-bold">{q.questionEn}</p>
                        <p className="text-xs text-slate-500">{q.questionVn}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                          <div className="bg-white/50 p-2 rounded border border-slate-200/50">
                            <span className="text-slate-500 text-xs block mb-1">Đáp án của bé:</span>
                            <span className={`font-bold ${q.isCorrect ? "text-emerald-600" : "text-rose-600"}`}>
                              {q.userAnswer || "(Không chọn)"}
                            </span>
                          </div>
                          <div className="bg-white/50 p-2 rounded border border-slate-200/50">
                            <span className="text-slate-500 text-xs block mb-1">Đáp án đúng:</span>
                            <span className="font-bold text-emerald-600">{q.correctAnswer}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : timoHistoryList.length === 0 ? (
                <div className="text-center py-10 text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  Chưa có dữ liệu thi TIMO nào. Bé hãy bắt đầu giải đề để ghi lại nhật ký nhé! 📝
                </div>
              ) : (
                <div className="space-y-4">
                  {timoHistoryList.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedTimoHistory(item);
                        playPopSound();
                      }}
                      className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all cursor-pointer group flex items-center justify-between"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-slate-500">
                          {new Date(item.timestamp).toLocaleString("vi-VN")}
                        </span>
                        <span className="font-black text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                          Khối {item.grade} | {item.round === "preliminary" ? "Vòng loại" : "Chung kết"} | Đề {item.testIndex + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-lg font-black text-indigo-500">
                            {item.score}/{item.total}
                          </span>
                        </div>
                        <span className="text-slate-300 group-hover:text-indigo-400 transition-colors text-xl font-black">
                          →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Purge button pinned at bottom */}
            {timoHistoryList.length > 0 && !selectedTimoHistory && (
              <div className="border-t-2 border-slate-200 pt-4 mt-auto">
                <button
                  onClick={handleClearTimoHistory}
                  className="w-full py-2.5 rounded-xl border-2 border-slate-900 bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs shadow-[2px_2px_0px_0px_#1e293b] hover:scale-[1.01] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🗑️ Xóa sạch nhật ký TIMO</span>
                </button>
              </div>
            )}
          </div>
        )}
"""
content = re.sub(r'(</main>)', timo_history_ui + r'\n      \1', content)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Injected timo history features successfully.")
