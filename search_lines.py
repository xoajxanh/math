for i, line in enumerate(open('src/app/page.tsx', encoding='utf-8')):
    if 'activeTab === "math" && (' in line or 'activeTab === "english" && (' in line or 'englishSubTab === "self"' in line or 'englishSubTab === "timo"' in line:
        print(i+1, line.strip())
