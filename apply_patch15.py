import os

def apply_patch():
    # Patch page.tsx
    with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add timoLanguage state
    content = content.replace(
        'const [timoRound, setTimoRound] = useState<TimoRound>("preliminary");',
        'const [timoRound, setTimoRound] = useState<TimoRound>("preliminary");\n  const [timoLanguage, setTimoLanguage] = useState<"en" | "vn">("en");'
    )

    # 2. Insert Language Selector
    config_selector = """                    <div className="flex flex-col gap-3">
                      <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="text-emerald-500">🌍</span> Ngôn Ngữ:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(["en", "vn"] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setTimoLanguage(lang);
                              playPopSound();
                            }}
                            className={`flex-1 min-w-[30%] sm:min-w-0 py-3 px-2 sm:px-4 rounded-xl font-black text-sm transition-all border-2 border-slate-900 cursor-pointer text-center
                              ${timoLanguage === lang
                                ? "bg-emerald-400 text-slate-900 shadow-none translate-x-[1px] translate-y-[1px]"
                                : "bg-white text-slate-600 hover:bg-emerald-50 shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b]"
                              }
                            `}
                          >
                            {lang === "en" ? "Tiếng Anh" : "Tiếng Việt"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <span className="text-indigo-500">📝</span> Chọn Đề Thi:"""

    content = content.replace(
        '                    <div className="flex flex-col gap-3">\n                      <label className="text-lg font-bold text-slate-800 flex items-center gap-2">\n                        <span className="text-indigo-500">📝</span> Chọn Đề Thi:',
        config_selector
    )

    # 3. Add language to payloads
    content = content.replace(
        'testIndex: timoTestIndex,\n        questions:',
        'testIndex: timoTestIndex,\n        language: timoLanguage,\n        questions:'
    )

    # 4. Modify active question
    old_active_q = """                              <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                                {timoQuestions[activeTimoIndex]?.questionEn}
                              </h3>
                              <p className="text-sm md:text-base font-bold text-slate-500 italic">
                                {timoQuestions[activeTimoIndex]?.questionVn}
                              </p>"""
    new_active_q = """                              <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                                {timoLanguage === "en" ? timoQuestions[activeTimoIndex]?.questionEn : timoQuestions[activeTimoIndex]?.questionVn}
                              </h3>"""
    content = content.replace(old_active_q, new_active_q)

    # 5. Modify summary question
    old_summary_q = """                                  <div className="text-slate-700 font-bold mb-1">{q.questionEn}</div>
                                  <div className="text-slate-500 text-sm mb-3">{q.questionVn}</div>"""
    new_summary_q = """                                  <div className="text-slate-700 font-bold mb-3">{timoLanguage === "en" ? q.questionEn : q.questionVn}</div>"""
    content = content.replace(old_summary_q, new_summary_q)

    # 6. Modify history question
    old_history_modal_q = """                      <div className="flex flex-col gap-1">
                        <div className="font-bold text-slate-800 text-sm md:text-base">{q.questionEn}</div>
                        <div className="font-bold text-slate-500 text-xs md:text-sm">{q.questionVn}</div>
                      </div>"""
    new_history_modal_q = """                      <div className="flex flex-col gap-1">
                        <div className="font-bold text-slate-800 text-sm md:text-base">
                          {selectedTimoHistory?.language === "vn" ? q.questionVn : q.questionEn}
                        </div>
                      </div>"""
    content = content.replace(old_history_modal_q, new_history_modal_q)

    # 7. Add flag to history list item
    old_history_list_item = """                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            👤 {item.studentName}
                          </span>"""
    new_history_list_item = """                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            {item.language === "vn" ? "🇻🇳 Tiếng Việt" : "🇬🇧 Tiếng Anh"}
                          </span>
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            👤 {item.studentName}
                          </span>"""
    content = content.replace(old_history_list_item, new_history_list_item)

    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched page.tsx")

    # Patch route.ts
    with open('src/app/api/timo-history/route.ts', 'r', encoding='utf-8') as f:
        content_api = f.read()
    
    content_api = content_api.replace(
        '      timestamp: payload.timestamp || new Date().toISOString(),\n      grade: payload.grade,',
        '      timestamp: payload.timestamp || new Date().toISOString(),\n      language: payload.language,\n      grade: payload.grade,'
    )
    with open('src/app/api/timo-history/route.ts', 'w', encoding='utf-8') as f:
        f.write(content_api)
    print("Patched route.ts")

if __name__ == "__main__":
    apply_patch()
