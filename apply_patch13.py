import os
import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert handleClearTimoHistory right before handleStartEnglish
clear_timo_history_fn = """  const handleClearTimoHistory = async () => {
    const password = prompt("Bố mẹ hoặc thầy cô hãy nhập mật khẩu Admin để xóa toàn bộ lịch sử thi TIMO:");
    if (password === null) return;
    if (password !== "12345ZXC") {
      alert("Mật khẩu không đúng!");
      return;
    }

    try {
      const res = await fetch("/api/timo-history", {
        method: "DELETE",
      });
      if (res.ok) {
        setTimoHistoryList([]);
        alert("Đã xóa toàn bộ lịch sử giải TIMO!");
      }
    } catch (error) {
      console.error("Failed to clear TIMO history", error);
    }
  };

"""

idx = content.find("  const handleStartEnglish = async () => {")
if idx != -1:
    content = content[:idx] + clear_timo_history_fn + content[idx:]
    print("Inserted handleClearTimoHistory")
else:
    print("Failed to find handleStartEnglish")

# 2. Add the delete button to the TIMO drawer
# Find the end of the TIMO drawer list
# It looks like:
#                 })}
#               </div>
#             )}
#           </div>
#         </div>
#       )}
# We want to add the button after `</div>` and before `</div>`
# Wait, let's use a regex to match the end of the `timoHistoryList.map` block
# In apply_patch11.py, the drawer ends with:
#               </div>
#             )}
#           </div>
#         </div>
#       )}
#
# Let's insert the button right before `</div>\n        </div>\n      )}`

timo_drawer_footer = """            )}
          </div>

          {timoHistoryList.length > 0 && (
            <div className="border-t-2 border-slate-200 pt-4 mt-auto">
              <button
                onClick={handleClearTimoHistory}
                className="w-full py-2.5 rounded-xl border-2 border-slate-900 bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs shadow-[2px_2px_0px_0px_#1e293b] hover:scale-[1.01] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Xóa Tất Cả Nhật Ký TIMO</span>
                <span className="text-base">🗑️</span>
              </button>
            </div>
          )}
        </div>
      )}"""

# Replace the specific end of the TIMO drawer
pattern = r"            \)\}\n          </div>\n        </div>\n      \)\}"
if re.search(pattern, content):
    content = re.sub(pattern, timo_drawer_footer, content, count=1)
    print("Inserted Delete Button in TIMO drawer")
else:
    print("Failed to find end of TIMO drawer")

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch 13 applied!")
