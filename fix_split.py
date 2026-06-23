import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

subtab_nav_regex = r'<div className="flex gap-4 justify-center mb-6">[\s\S]*?\{englishSubTab === "self" && \('
content = re.sub(subtab_nav_regex, '<>', content)

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

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Split logic applied!")
