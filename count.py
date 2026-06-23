import os

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

s2 = content.split('English Practice Workspace')[1]
section = s2.split('{englishSubTab === "timo" && (')[0]

print("Divs:", section.count('<div'), section.count('</div>'))
print("Fragments:", section.count('<>'), section.count('</>'))
