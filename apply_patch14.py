import os

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Make Grade selection wrap and adjust padding
content = content.replace(
    '<div className="flex gap-2">\n                        {[1, 2, 3, 4, 5].map((g) => (',
    '<div className="flex flex-wrap gap-2">\n                        {[1, 2, 3, 4, 5].map((g) => ('
)

# Make Round selection wrap
content = content.replace(
    '<div className="flex gap-2">\n                        {(["preliminary", "heat"] as TimoRound[]).map((r) => (',
    '<div className="flex flex-wrap gap-2">\n                        {(["preliminary", "heat"] as TimoRound[]).map((r) => ('
)

# Reduce horizontal padding on mobile for these specific buttons
# The buttons use: className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all border-2 border-slate-900 cursor-pointer
# Let's replace 'px-4' with 'px-2 sm:px-4 min-w-[30%]' for Grade buttons to allow wrap and equal size
# Wait, replacing blindly might affect other buttons.
# So we do string replace for the whole line:

old_btn_class = 'className={`flex-1 py-3 px-4 rounded-xl font-black text-sm transition-all border-2 border-slate-900 cursor-pointer'
new_btn_class = 'className={`flex-1 min-w-[30%] sm:min-w-0 py-3 px-2 sm:px-4 rounded-xl font-black text-sm transition-all border-2 border-slate-900 cursor-pointer text-center'

content = content.replace(old_btn_class, new_btn_class)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patch 14 applied!")
