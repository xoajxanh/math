import os

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the Floating English History Trigger Tab condition
content = content.replace(
    "{studentName && !isEnglishHistoryOpen && activeTab === \"english\" && (",
    "{studentName && !isEnglishHistoryOpen && activeTab === \"english\" && englishSubTab === \"self\" && ("
)

# 2. Add Floating TIMO History Trigger Tab
timo_history_trigger = """
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
"""
idx1 = content.find("{/* Question Navigation Drawer */}")
if idx1 != -1:
    content = content[:idx1] + timo_history_trigger + "\n      " + content[idx1:]
else:
    print("Failed to find Question Navigation Drawer")

# 3. Add TIMO History Navigation Drawer
timo_drawer = """
      {/* TIMO History Navigation Drawer */}
      {studentName && activeTab === "english" && englishSubTab === "timo" && (
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md sm:max-w-lg md:max-w-xl bg-white border-l-3 border-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out p-6 flex flex-col ${
            isTimoHistoryOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b-3 border-slate-900">
            <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span className="text-2xl">🏆</span> Nhật Ký Giải TIMO
            </h2>
            <button
              onClick={() => {
                setIsTimoHistoryOpen(false);
                playPopSound();
              }}
              className="w-10 h-10 rounded-xl border-3 border-slate-900 flex items-center justify-center font-black text-slate-900 hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b]"
            >
              ✕
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
            {timoHistoryList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center opacity-70">
                <div className="text-4xl mb-2">📭</div>
                <p className="font-bold text-slate-500">Chưa có bài thi TIMO nào được nộp</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {timoHistoryList.map((item: any) => {
                  return (
                    <button
                      key={item.sessionId}
                      onClick={() => {
                        setSelectedTimoHistory(item);
                        playPopSound();
                      }}
                      className="w-full text-left bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#1e293b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer group flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-indigo-100 border border-slate-900 flex items-center justify-center text-xs font-bold shadow-[1px_1px_0px_0px_#1e293b]">
                            {item.grade}
                          </span>
                          <span className="font-black text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">
                            {item.round === "preliminary" ? "Vòng Loại" : "Chung Kết"} - Đề {item.testIndex + 1}
                          </span>
                        </div>
                        <span className="font-bold text-xs text-slate-400">
                          {new Date(item.timestamp).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                          <span className="text-xs font-bold text-slate-600">Đúng:</span>
                          <span className="text-sm font-black text-emerald-500">
                            {item.score}/{item.totalQuestions}
                          </span>
                        </div>
                        <span className="text-indigo-500 text-sm">Xem chi tiết ➡️</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
"""
idx2 = content.find("{/* English History Navigation Drawer */}")
if idx2 != -1:
    content = content[:idx2] + timo_drawer + "\n      " + content[idx2:]
else:
    print("Failed to find English History Navigation Drawer")

# 4. Add Detailed TIMO Submission Viewer Modal
timo_modal = """
      {/* Detailed TIMO Submission Viewer Modal */}
      {selectedTimoHistory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-pop">
          <div className="bg-white border-3 border-slate-900 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-indigo-100 border-b-3 border-slate-900 p-4 md:p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
                  <span>🏆</span> Chi Tiết Bài TIMO: {selectedTimoHistory.studentName}
                </h3>
                <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">
                  Khối {selectedTimoHistory.grade} • {selectedTimoHistory.round === "preliminary" ? "Vòng Loại" : "Chung Kết"} • Đề {selectedTimoHistory.testIndex + 1}
                </p>
                <p className="text-xs md:text-sm font-bold text-slate-400 mt-0.5">
                  Thời gian: {new Date(selectedTimoHistory.timestamp).toLocaleString("vi-VN")}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => setSelectedTimoHistory(null)}
                  className="w-10 h-10 rounded-xl border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 hover:bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#1e293b]"
                >
                  ✕
                </button>
                <div className="bg-white px-3 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#1e293b]">
                  <span className="font-bold text-slate-600 text-xs md:text-sm mr-1.5">Kết quả:</span>
                  <span className="font-black text-emerald-600 text-sm md:text-base">
                    {selectedTimoHistory.score} / {selectedTimoHistory.totalQuestions}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Content - Questions List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 custom-scrollbar">
              <div className="flex flex-col gap-4">
                {selectedTimoHistory.questions.map((q: any, idx: number) => {
                  const isCorrect = q.userAnswer === q.correctAnswer;
                  return (
                    <div key={idx} className={`p-4 md:p-5 rounded-2xl border-2 shadow-sm flex flex-col gap-3 relative overflow-hidden ${
                      isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-rose-50 border-rose-300"
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-black border-2 ${
                          isCorrect ? "bg-emerald-100 text-emerald-700 border-emerald-400" : "bg-rose-100 text-rose-700 border-rose-400"
                        }`}>
                          Câu {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{q.category}</span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="font-bold text-slate-800 text-sm md:text-base">{q.questionEn}</div>
                        <div className="font-bold text-slate-500 text-xs md:text-sm">{q.questionVn}</div>
                      </div>

                      {q.imageUrl && (
                        <div className="w-full flex justify-center my-2">
                          <img src={q.imageUrl} alt="Question" className="max-h-40 object-contain rounded-lg border border-slate-300 shadow-sm" />
                        </div>
                      )}

                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                          {q.options.map((opt: string, optIdx: number) => {
                            const optLabel = ["A", "B", "C", "D"][optIdx];
                            const optImg = q.optionImages ? q.optionImages[optIdx] : null;
                            const isUserAns = q.userAnswer === opt;
                            const isCorrectAns = q.correctAnswer === opt;
                            
                            let optBg = "bg-white border-slate-200";
                            if (isCorrectAns) optBg = "bg-emerald-100 border-emerald-400 shadow-[2px_2px_0px_0px_#34d399]";
                            else if (isUserAns && !isCorrectAns) optBg = "bg-rose-100 border-rose-400 shadow-[2px_2px_0px_0px_#fb7185]";
                            
                            return (
                              <div key={optIdx} className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center gap-1 relative ${optBg}`}>
                                <span className="absolute top-1 left-1.5 text-[10px] font-black text-slate-400">{optLabel}</span>
                                {optImg ? (
                                  <img src={optImg} alt={`Option ${optLabel}`} className="max-h-12 object-contain mt-3" />
                                ) : (
                                  <span className="font-bold text-slate-700 mt-2 text-sm">{opt !== optLabel ? opt : ""}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div className="mt-2 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-slate-200">
                          <span className="text-xs font-bold text-slate-500">Bé chọn:</span>
                          <span className={`text-sm font-black ${q.userAnswer ? (isCorrect ? "text-emerald-600" : "text-rose-600") : "text-slate-400"}`}>
                            {q.userAnswer || "(Không chọn)"}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                            <span className="text-xs font-bold text-emerald-700">Đáp án đúng:</span>
                            <span className="text-sm font-black text-emerald-600">{q.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t-2 border-slate-200 p-4 flex justify-end">
              <button
                onClick={() => setSelectedTimoHistory(null)}
                className="px-6 py-2.5 rounded-xl border-2 border-slate-900 bg-slate-200 text-slate-800 font-black text-sm hover:bg-slate-300 transition-all shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
              >
                Đóng Lại
              </button>
            </div>
          </div>
        </div>
      )}
"""
idx3 = content.find("{/* Detailed English Submission Viewer Modal */}")
if idx3 != -1:
    content = content[:idx3] + timo_modal + "\n      " + content[idx3:]
else:
    print("Failed to find Detailed English Submission Viewer Modal")

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch 11 applied!")
