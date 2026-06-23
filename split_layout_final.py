with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Remove the Sub Tab Switcher at the top of English tab
# It starts at: {/* Sub Tab Switcher */}
# It ends at: <div className="animate-pop">
pattern1 = r'            \{/\* Sub Tab Switcher \*/\}[\s\S]*?\{englishSubTab === "self" && \(\n              <div className="animate-pop">'
content = re.sub(pattern1, '', content)

# 2. Replace the transition between English and TIMO
pattern2 = r'              \)\}\n            </section>\n\n              </div>\n            \)\}\n\n            \{englishSubTab === "timo" && \(\n              <div className="w-full flex flex-col gap-6 animate-pop">'
replacement2 = r'''              )}
            </section>
          </>
        )}

        {activeTab === "timo" && (
          <div className="w-full flex flex-col gap-6 animate-pop">'''
content = re.sub(pattern2, replacement2, content)

# 3. Remove the stray brackets at the end of the file before </main>
pattern3 = r'            \)\}\n\n\n          </>\n        \)\}\n\n      </main>'
replacement3 = r'''            )}

      </main>'''
content = re.sub(pattern3, replacement3, content)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Layout split successfully!")
