const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

// Block 1
content = content.replace(
  `import { VOCABULARY_LIST, SENTENCE_LIST } from "@/data/englishData";`,
  `import { VOCABULARY_LIST, SENTENCE_LIST } from "@/data/englishData";\nimport { getTimoDataByGrade, getTimoTestCount, TimoRound } from "@/data/timoData";`
);

content = content.replace(
  `// Cấu hình môn Tiếng Anh\n  const [activeTab, setActiveTab] = useState<"math" | "english">("math");`,
  `// Cấu hình môn Tiếng Anh chung\n  const [activeTab, setActiveTab] = useState<"math" | "english">("math");\n  const [englishSubTab, setEnglishSubTab] = useState<"self" | "timo">("self");\n\n  // Tiếng Anh Tự ôn luyện`
);

content = content.replace(
  `const [activeEnglishIndex, setActiveEnglishIndex] = useState<number>(0);`,
  `const [activeEnglishIndex, setActiveEnglishIndex] = useState<number>(0);\n\n  // Tiếng Anh TIMO\n  const [timoGrade, setTimoGrade] = useState<number>(1);\n  const [timoRound, setTimoRound] = useState<TimoRound>("preliminary");\n  const [timoTestIndex, setTimoTestIndex] = useState<number>(0);\n  const [hasStartedTimo, setHasStartedTimo] = useState<boolean>(false);\n  const [timoQuestions, setTimoQuestions] = useState<any[]>([]);\n  const [activeTimoIndex, setActiveTimoIndex] = useState<number>(0);\n  const [isTimoChecked, setIsTimoChecked] = useState<boolean>(false);\n  const [timoScore, setTimoScore] = useState<number>(0);\n  const [timoSessionId, setTimoSessionId] = useState<string>("");`
);

// Block 2
const handleStartTimoStr = `
  const handleStartTimo = () => {
    const data = getTimoDataByGrade(timoGrade, timoRound, timoTestIndex);
    if (!data || data.length === 0) {
      alert("Đề thi này chưa có dữ liệu, bé chọn đề khác nhé!");
      return;
    }

    const selected = data.map((q) => ({
      ...q,
      userAnswer: "",
      checked: false,
      shake: false,
    }));

    setTimoQuestions(selected);
    setHasStartedTimo(true);
    setActiveTimoIndex(0);
    setIsTimoChecked(false);
    setTimoScore(0);
    setTimoSessionId(\`timo-\${Date.now()}-\${Math.floor(Math.random() * 1000)}\`);
    playPopSound();
  };

  const handleTimoOptionSelect = (qId: number, option: string) => {
    setTimoQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, userAnswer: option } : q))
    );
    playPopSound();
  };

  const handleNextTimo = () => {
    if (activeTimoIndex < timoQuestions.length - 1) {
      setActiveTimoIndex(activeTimoIndex + 1);
      playPopSound();
    } else {
      handleCheckTimo();
    }
  };

  const handleStopTimo = () => {
    setHasStartedTimo(false);
    setTimoQuestions([]);
    setIsTimoChecked(false);
    setTimoScore(0);
    playPopSound();
  };

  const handleCheckTimo = async () => {
    let correct = 0;
    const updated = timoQuestions.map((q) => {
      const isCorrect = q.userAnswer === q.correctAnswer;
      if (isCorrect) correct++;
      return { ...q, checked: true, isCorrect, shake: !isCorrect };
    });
    setTimoQuestions(updated);
    setIsTimoChecked(true);
    setTimoScore(correct);

    setTimeout(() => {
      setTimoQuestions((prev) => prev.map((q) => ({ ...q, shake: false })));
    }, 500);

    if (correct === updated.length) {
      playFeedbackSound("correct");
    } else {
      playFeedbackSound("incorrect");
    }

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
  };
`;

content = content.replace(
  `// Trạng thái bài tập`,
  handleStartTimoStr + `\n  // Trạng thái bài tập`
);

// Block 3
const englishTabsStr = `
                    <div className="flex bg-slate-200 p-1 rounded-3xl w-fit mx-auto mb-6 shadow-inner">
                      <button
                        onClick={() => {
                          if (hasStartedTimo) {
                            playFeedbackSound("incorrect");
                            alert("Bé ơi, bé chưa nộp bài Tiếng Anh TIMO mà! Hãy Nộp bài hoặc 'Thoát' trước khi chuyển nhé. 🙈");
                            return;
                          }
                          setEnglishSubTab("self");
                          playPopSound();
                        }}
                        className={\`px-5 py-2.5 rounded-2xl border-3 border-slate-900 font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e293b] flex items-center gap-1.5
                          \${englishSubTab === "self" 
                            ? "bg-purple-400 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]" 
                            : "bg-white text-slate-500 hover:bg-slate-50 border-transparent hover:border-slate-300 shadow-none"}\`}
                      >
                        <span className={englishSubTab === "self" ? "animate-bounce-slow" : "opacity-50"}>✨</span> Tự Ôn Luyện
                      </button>
                      <button
                        onClick={() => {
                          if (hasStartedEnglish) {
                            playFeedbackSound("incorrect");
                            alert("Bé ơi, bé chưa hoàn thành bài Tiếng Anh Tự ôn mà! Hãy Chọn xong các câu hoặc 'Dừng Ôn Luyện' trước khi chuyển nhé. 🙈");
                            return;
                          }
                          setEnglishSubTab("timo");
                          playPopSound();
                        }}
                        className={\`px-5 py-2.5 rounded-2xl border-3 border-slate-900 font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e293b] flex items-center gap-1.5
                          \${englishSubTab === "timo" 
                            ? "bg-indigo-400 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]" 
                            : "bg-white text-slate-500 hover:bg-slate-50 border-transparent hover:border-slate-300 shadow-none"}\`}
                      >
                        <span className={englishSubTab === "timo" ? "animate-bounce-slow" : "opacity-50"}>🏆</span> Giải Đề TIMO
                      </button>
                    </div>

                    {englishSubTab === "self" ? (
                      <>
`;

content = content.replace(
  `{/* Lựa chọn loại bài tập */}`,
  englishTabsStr + `\n                      {/* Lựa chọn loại bài tập */}`
);

const timoUiStr = `
                      </>
                    ) : (
                      <div className="w-full flex flex-col gap-6 animate-pop">
                        {/* TIMO Configuration */}
                        <section className="bg-white border-4 border-slate-900 rounded-[2rem] p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1e293b] relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-bl-[100px] -z-10 opacity-50"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-100 rounded-tr-[80px] -z-10 opacity-50"></div>
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-200 rounded-2xl border-2 border-slate-900 flex items-center justify-center text-2xl shadow-[2px_2px_0px_0px_#1e293b]">🏆</div>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Giải Đề Thi TIMO</h2>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="flex flex-col gap-3">
                              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <span className="text-indigo-500">🎓</span> Chọn Khối:
                              </label>
                              <div className="flex gap-2">
                                {[1, 2, 3].map((g) => (
                                  <button
                                    key={g}
                                    onClick={() => {
                                      setTimoGrade(g);
                                      setTimoTestIndex(0);
                                      playPopSound();
                                    }}
                                    className={\`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all border-2 border-slate-900 cursor-pointer
                                      \${timoGrade === g
                                        ? "bg-indigo-400 text-white shadow-none translate-x-[1px] translate-y-[1px]"
                                        : "bg-white text-slate-600 hover:bg-indigo-50 shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b]"
                                      }
                                    \`}
                                  >
                                    Khối {g}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col gap-3">
                              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <span className="text-rose-500">🔥</span> Vòng Thi:
                              </label>
                              <div className="flex gap-2">
                                {(["preliminary", "heat"] as TimoRound[]).map((r) => (
                                  <button
                                    key={r}
                                    onClick={() => {
                                      setTimoRound(r);
                                      setTimoTestIndex(0);
                                      playPopSound();
                                    }}
                                    className={\`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all border-2 border-slate-900 cursor-pointer
                                      \${timoRound === r
                                        ? "bg-rose-400 text-white shadow-none translate-x-[1px] translate-y-[1px]"
                                        : "bg-white text-slate-600 hover:bg-rose-50 shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b]"
                                      }
                                    \`}
                                  >
                                    {r === "preliminary" ? "Vòng loại" : "Chung kết"}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col gap-3">
                              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <span className="text-indigo-500">📝</span> Chọn Đề Thi:
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {Array.from({ length: Math.max(1, getTimoTestCount(timoGrade, timoRound)) }).map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      setTimoTestIndex(idx);
                                      playPopSound();
                                    }}
                                    className={\`px-4 py-2 rounded-xl font-black text-sm transition-all border-2 border-slate-900 cursor-pointer
                                      \${timoTestIndex === idx
                                        ? "bg-amber-400 text-slate-900 shadow-none translate-x-[1px] translate-y-[1px]"
                                        : "bg-white text-slate-600 hover:bg-amber-50 shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b]"
                                      }
                                    \`}
                                  >
                                    Đề {idx + 1}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 flex items-center justify-center border-t-2 border-slate-900/10 pt-6">
                            <button
                              onClick={handleStartTimo}
                              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-3 border-slate-900 bg-emerald-400 text-slate-900 font-extrabold text-lg shadow-[4px_4px_0px_0px_#1e293b] hover:bg-emerald-300 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <span>{!hasStartedTimo ? "Bắt Đầu Giải Đề TIMO" : "Làm Lại"}</span>
                              <span className="text-xl">🚀</span>
                            </button>
                          </div>
                        </section>

                        {/* TIMO Practice Notebook Sheet */}
                        <section className="w-full mt-8">
                          {!hasStartedTimo ? (
                            <div className="w-full bg-white border-3 border-slate-900 rounded-3xl p-12 text-center shadow-[6px_6px_0px_0px_#1e293b] flex flex-col items-center justify-center gap-6 relative animate-pop">
                              <div className="text-8xl animate-bounce-slow">💡</div>
                              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 text-center">
                                Chọn đề và Bắt đầu ngay bé nhé!
                              </h2>
                            </div>
                          ) : (
                            <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 animate-pop">
                              <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-2xl border-3 border-slate-900 shadow-[4px_4px_0px_0px_#1e293b]">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-indigo-100 rounded-xl border-2 border-slate-900 flex items-center justify-center text-xl font-black text-indigo-600">
                                    {activeTimoIndex + 1}
                                  </div>
                                  <span className="font-bold text-slate-600">/ {timoQuestions.length} câu</span>
                                </div>
                                <div className="flex gap-2">
                                  {!isTimoChecked && (
                                    <button
                                      onClick={() => {
                                        if (confirm("Bé có chắc chắn muốn nộp bài ngay không?")) {
                                          handleCheckTimo();
                                        }
                                      }}
                                      className="px-3.5 py-1.5 rounded-full bg-emerald-100 border-2 border-slate-900 text-emerald-700 text-xs font-black shadow-[2px_2px_0px_0px_#1e293b] hover:bg-emerald-200 cursor-pointer text-center whitespace-nowrap"
                                    >
                                      Nộp Bài 📥
                                    </button>
                                  )}
                                  <button
                                    onClick={handleStopTimo}
                                    className="px-3.5 py-1.5 rounded-full bg-rose-100 border-2 border-slate-900 text-rose-700 text-xs font-black shadow-[2px_2px_0px_0px_#1e293b] hover:bg-rose-200 cursor-pointer text-center whitespace-nowrap"
                                  >
                                    Thoát 🚪
                                  </button>
                                </div>
                              </div>

                              <div className="notebook-bg p-4 md:p-8 rounded-2xl border-2 border-slate-200/80 flex flex-col min-h-[350px] relative">
                                {/* Summary when done */}
                                {isTimoChecked ? (
                                  <div className="w-full flex flex-col gap-6 animate-pop">
                                    <div className="text-center">
                                      <div className="text-5xl mb-4">{timoScore === timoQuestions.length ? "🌟" : timoScore >= timoQuestions.length * 0.6 ? "👍" : "💪"}</div>
                                      <h3 className="text-2xl font-black text-slate-800">Điểm của bé: {timoScore}/{timoQuestions.length}</h3>
                                    </div>
                                    <div className="flex flex-col gap-4 mt-6">
                                      {timoQuestions.map((q, i) => (
                                        <div key={i} className={\`p-4 rounded-xl border-2 \${q.isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-rose-50 border-rose-300"}\`}>
                                          <div className="flex gap-2 font-bold text-sm mb-2">
                                            <span className={q.isCorrect ? "text-emerald-600" : "text-rose-600"}>
                                              {q.isCorrect ? "✅ ĐÚNG" : "❌ SAI"}
                                            </span>
                                            <span className="text-slate-800">Câu {i + 1}</span>
                                          </div>
                                          <div className="text-slate-700 font-bold mb-1">{q.questionEn}</div>
                                          <div className="text-slate-500 text-sm mb-3">{q.questionVn}</div>
                                          <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div className="bg-white/50 p-2 rounded">
                                              <span className="text-slate-500 text-xs block">Bé chọn:</span>
                                              <span className={\`font-bold \${q.isCorrect ? "text-emerald-600" : "text-rose-600"}\`}>{q.userAnswer || "(Không chọn)"}</span>
                                            </div>
                                            <div className="bg-white/50 p-2 rounded">
                                              <span className="text-slate-500 text-xs block">Đáp án:</span>
                                              <span className="font-bold text-emerald-600">{q.correctAnswer}</span>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  /* Active Question */
                                  <div className={\`flex-1 flex flex-col gap-6 \${timoQuestions[activeTimoIndex]?.shake ? "animate-shake" : ""}\`}>
                                    <div className="flex flex-col gap-2">
                                      <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">{timoQuestions[activeTimoIndex]?.category}</span>
                                      <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                                        {timoQuestions[activeTimoIndex]?.questionEn}
                                      </h3>
                                      <p className="text-sm md:text-base font-bold text-slate-500 italic">
                                        {timoQuestions[activeTimoIndex]?.questionVn}
                                      </p>
                                    </div>

                                    {timoQuestions[activeTimoIndex]?.imageUrl && (
                                      <div className="w-full flex justify-center py-4">
                                        <img src={timoQuestions[activeTimoIndex].imageUrl} alt="Question figure" className="max-w-full max-h-64 object-contain rounded-xl border-2 border-slate-200/50" />
                                      </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                                      {timoQuestions[activeTimoIndex]?.options?.map((opt: string, optIndex: number) => {
                                        const optLabel = ["A", "B", "C", "D"][optIndex];
                                        const optImage = timoQuestions[activeTimoIndex]?.optionImages?.[optIndex];
                                        const isSelected = timoQuestions[activeTimoIndex].userAnswer === opt;
                                        return (
                                          <button
                                            key={optIndex}
                                            onClick={() => handleTimoOptionSelect(timoQuestions[activeTimoIndex].id, opt)}
                                            className={\`p-4 rounded-2xl border-3 font-bold text-left transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden group
                                              \${isSelected 
                                                ? "bg-indigo-50 border-indigo-500 text-indigo-700 shadow-[4px_4px_0px_0px_#6366f1]" 
                                                : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30"
                                              }\`}
                                          >
                                            <div className={\`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                                              \${isSelected ? "bg-indigo-500 border-indigo-500 text-white" : "bg-slate-100 border-slate-300 text-slate-400 group-hover:border-indigo-300"}\`}
                                            >
                                              {optLabel}
                                            </div>
                                            {optImage ? (
                                              <img src={optImage} alt={\`Option \${optLabel}\`} className="max-h-16 object-contain" />
                                            ) : (
                                              <span className={\`text-lg \${opt !== optLabel ? "" : "opacity-0"}\`}>{opt !== optLabel ? opt : " "}</span>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>

                                    <div className="flex justify-between items-center mt-6 pt-6 border-t-2 border-slate-100">
                                      <button
                                        onClick={() => {
                                          if (activeTimoIndex > 0) setActiveTimoIndex(activeTimoIndex - 1);
                                          playPopSound();
                                        }}
                                        disabled={activeTimoIndex === 0}
                                        className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-slate-200 text-slate-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                                      >
                                        Quay lại
                                      </button>
                                      
                                      <button
                                        onClick={handleNextTimo}
                                        className="px-8 py-3 rounded-xl font-black text-sm border-3 border-slate-900 bg-amber-400 text-slate-900 shadow-[4px_4px_0px_0px_#1e293b] hover:bg-amber-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1e293b] transition-all flex items-center gap-2"
                                      >
                                        {activeTimoIndex < timoQuestions.length - 1 ? (
                                          <>Câu tiếp theo <span>➡️</span></>
                                        ) : (
                                          <>Hoàn Thành <span>✨</span></>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </section>
                      </div>
                    )}
`;

content = content.replace(
  `{englishQuestions.length > 0 && (\n                        <button`,
  timoUiStr + `\n                      {englishQuestions.length > 0 && (\n                        <button`
);

fs.writeFileSync('src/app/page.tsx', content);
