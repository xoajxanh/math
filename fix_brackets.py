with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the stray <> 
content = content.replace(
    '            {/* Sub Tab Switcher */}\n            <>\n',
    '            {/* Sub Tab Switcher */}\n'
)

# Remove the stray closing bracket
content = content.replace(
    '              </>\n            )}\n          </>\n        )}\n\n        {activeTab === "timo" && (',
    '          </>\n        )}\n\n        {activeTab === "timo" && ('
)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Brackets fixed!")
