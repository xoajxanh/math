import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update state
content = content.replace('const [activeTab, setActiveTab] = useState<"math" | "english">("math");', 'const [activeTab, setActiveTab] = useState<"math" | "english" | "timo">("math");')
content = re.sub(r'const \[englishSubTab, setEnglishSubTab\] = useState<"self" \| "timo">\("self"\);\n\s*', '', content)

# 2. Update Header Text
header_pattern = r'\{activeTab === "math" \? "BÉ VUI HỌC TOÁN" : "BÉ VUI HỌC TIẾNG ANH"\}'
content = content.replace(header_pattern, '{activeTab === "math" ? "BÉ VUI HỌC TOÁN" : activeTab === "english" ? "BÉ VUI HỌC TIẾNG ANH" : "TOÁN QUỐC TẾ TIMO"}')

# 3. Update Nav Buttons
english_btn_regex = r'(<button\s*onClick=\{[^}]*?setActiveTab\("english"\);[^}]*\}\s*className=\{`[^`]*`\}\s*>\s*<span>.*?</span> Môn Tiếng Anh\s*</button>)'
match = re.search(english_btn_regex, content)
if match:
    nav_container_regex = r'(<div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-6 mt-6 mb-8 relative z-20">)([\s\S]*?)(</div>\s*<main)'
    match2 = re.search(nav_container_regex, content)
    if match2:
        new_nav = '''<div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-6 mt-6 mb-8 relative z-20">
          <button
            onClick={() => {
              if (activeTab === "math") return;
              if (hasStartedEnglish && englishQuestions.length > 0 && !englishQuestions.every(q => q.checked && q.score)) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Tiếng Anh mà! Hãy Nộp bài hoặc \'Làm lại\' trước khi chuyển môn nhé. 😊");
                return;
              }
              if (hasStartedTimo && !isTimoChecked) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Toán TIMO mà! Hãy Nộp bài hoặc \'Thoát\' trước khi chuyển môn nhé. 😊");
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
                alert("Bé ơi, bé chưa nộp bài Toán mà! Hãy Nộp bài hoặc \'Làm lại\' trước khi chuyển môn nhé. 😊");
                return;
              }
              if (hasStartedTimo && !isTimoChecked) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Toán TIMO mà! Hãy Nộp bài hoặc \'Thoát\' trước khi chuyển môn nhé. 😊");
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
                alert("Bé ơi, bé chưa nộp bài Toán mà! Hãy Nộp bài hoặc \'Làm lại\' trước khi chuyển môn nhé. 😊");
                return;
              }
              if (hasStartedEnglish && englishQuestions.length > 0 && !englishQuestions.every(q => q.checked && q.score)) {
                playFeedbackSound("incorrect");
                alert("Bé ơi, bé chưa nộp bài Tiếng Anh mà! Hãy Nộp bài hoặc \'Làm lại\' trước khi chuyển môn nhé. 😊");
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
        <main'''
        content = content[:match2.start()] + new_nav + content[match2.end(3):]
        
# 4. Remove Subtab Nav and `{englishSubTab === "self" && (`
subtab_nav_regex = r'<div className="flex gap-4 justify-center mb-6">[\s\S]*?\{englishSubTab === "self" && \('
content = re.sub(subtab_nav_regex, '<>', content)

# 5. Split English and TIMO tabs
# Search for the specific transition string
transition_old = """              </div>
            )}

            {englishSubTab === "timo" && ("""

transition_new = """              </>
            )}
          </>
        )}

        {activeTab === "timo" && (
          <>"""
content = content.replace(transition_old, transition_new)

# 6. Update Triggers
content = content.replace('{studentName && !isEnglishHistoryOpen && activeTab === "english" && englishSubTab === "self" && (', '{studentName && !isEnglishHistoryOpen && activeTab === "english" && (')
content = content.replace('{studentName && !isTimoHistoryOpen && activeTab === "english" && englishSubTab === "timo" && (', '{studentName && !isTimoHistoryOpen && activeTab === "timo" && (')
content = content.replace('{studentName && activeTab === "english" && englishSubTab === "timo" && (', '{studentName && activeTab === "timo" && (')

# Wait, the history trigger might be slightly different.
# Let's replace the exact strings.

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch applied successfully!")
