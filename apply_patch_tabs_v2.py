import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update State
content = content.replace(
    'const [activeTab, setActiveTab] = useState<"math" | "english">("math");',
    'const [activeTab, setActiveTab] = useState<"math" | "english" | "timo">("math");'
)

content = content.replace(
    'const [englishSubTab, setEnglishSubTab] = useState<"self" | "timo">("self");',
    ''
)

# 2. Update Header Title
content = re.sub(
    r'\{activeTab === "math" \? "BÉ VUI HỌC TOÁN" : "BÉ VUI HỌC TIẾNG ANH"\}',
    '{activeTab === "math" ? "BÉ VUI HỌC TOÁN" : activeTab === "english" ? "BÉ VUI HỌC TIẾNG ANH" : "TOÁN QUỐC TẾ TIMO"}',
    content
)

# 3. Fix Nav Buttons (Extract from <header>...</header> up to <main>)
nav_old_pattern = r'<div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-6 mt-6 mb-8 relative z-20">[\s\S]*?</header>\s*<main'
match = re.search(nav_old_pattern, content)
if match:
    new_nav = '''<div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-6 mt-6 mb-8 relative z-20">
          <button
            onClick={() => {
              if (activeTab === "math") return;
              if (hasStartedEnglish && englishQuestions.length > 0 && !englishQuestions.every(q => q.checked && q.score)) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Tiếng Anh mà! Hãy Nộp bài hoặc \\"Làm lại\\" trước khi chuyển môn nhé. 😊");
                return;
              }
              if (hasStartedTimo && !isTimoChecked) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Toán TIMO mà! Hãy Nộp bài hoặc \\"Thoát\\" trước khi chuyển môn nhé. 😊");
                return;
              }
              setActiveTab("math");
              playPopSound();
            }}
            className={`px-5 py-2.5 rounded-2xl border-3 border-slate-900 font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e293b] flex items-center gap-1.5
              ${activeTab === "math"
                ? "bg-amber-400 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-white text-slate-700 hover:bg-slate-50"
              }
            `}
          >
            <span>🔢</span> Môn Toán
          </button>
          <button
            onClick={() => {
              if (activeTab === "english") return;
              if (hasStarted && !checked) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Toán mà! Hãy Nộp bài hoặc \\"Làm lại\\" trước khi chuyển môn nhé. 😊");
                return;
              }
              if (hasStartedTimo && !isTimoChecked) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Toán TIMO mà! Hãy Nộp bài hoặc \\"Thoát\\" trước khi chuyển môn nhé. 😊");
                return;
              }
              setActiveTab("english");
              playPopSound();
            }}
            className={`px-5 py-2.5 rounded-2xl border-3 border-slate-900 font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e293b] flex items-center gap-1.5
              ${activeTab === "english"
                ? "bg-purple-400 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-white text-slate-700 hover:bg-purple-50"
              }
            `}
          >
            <span>🔤</span> Môn Tiếng Anh
          </button>
          <button
            onClick={() => {
              if (activeTab === "timo") return;
              if (hasStarted && !checked) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Toán mà! Hãy Nộp bài hoặc \\"Làm lại\\" trước khi chuyển môn nhé. 😊");
                return;
              }
              if (hasStartedEnglish && englishQuestions.length > 0 && !englishQuestions.every(q => q.checked && q.score)) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Tiếng Anh mà! Hãy Nộp bài hoặc \\"Làm lại\\" trước khi chuyển môn nhé. 😊");
                return;
              }
              setActiveTab("timo");
              playPopSound();
            }}
            className={`px-5 py-2.5 rounded-2xl border-3 border-slate-900 font-black text-sm transition-all cursor-pointer shadow-[3px_3px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1e293b] flex items-center gap-1.5
              ${activeTab === "timo"
                ? "bg-emerald-400 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]"
                : "bg-white text-slate-700 hover:bg-emerald-50"
              }
            `}
          >
            <span>🏆</span> Toán TIMO
          </button>
        </div>
      </header>
      <main'''
    content = content[:match.start()] + new_nav + content[match.end():]
else:
    print("Failed to match nav buttons")

# 4. Remove englishSubTab === "self" UI
content = re.sub(r'<div className="flex gap-4 justify-center mb-6">[\s\S]*?\{englishSubTab === "self" && \(', '<>', content)

# 5. Fix the split
transition_old = """              </div>
            )}

            {englishSubTab === "timo" && ("""

transition_new = """              </>
            )}
          </>
        )}

        {activeTab === "timo" && ("""

content = content.replace(transition_old, transition_new)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch applied successfully!")
