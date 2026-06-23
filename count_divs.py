import os

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

s2 = content.find('English Practice Workspace')
s3 = content.find('              </div>\n            )}\n\n            {englishSubTab === "timo" && (')
section = content[s2:s3]
print("Divs:", section.count('<div'), section.count('</div>'))

# Also count `<>` and `</>`
print("Fragments:", section.count('<>'), section.count('</>'))
