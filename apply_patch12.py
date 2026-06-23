import os

# 1. Update API route
with open('src/app/api/timo-history/route.ts', 'r', encoding='utf-8') as f:
    route_content = f.read()

route_content = route_content.replace(
    "questionVn: q.questionVn,",
    "questionVn: q.questionVn,\n        imageUrl: q.imageUrl,\n        options: q.options,\n        optionImages: q.optionImages,"
)

with open('src/app/api/timo-history/route.ts', 'w', encoding='utf-8') as f:
    f.write(route_content)

# 2. Update page.tsx
with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    page_content = f.read()

old_list_item = """                        <span className="font-bold text-xs text-slate-400">
                          {new Date(item.timestamp).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                        </span>"""

new_list_item = """                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                            👤 {item.studentName}
                          </span>
                          <span className="font-bold text-[10px] text-slate-400">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>"""

if old_list_item in page_content:
    page_content = page_content.replace(old_list_item, new_list_item)
    print("Replaced timestamp rendering in page.tsx")
else:
    print("Could not find old list item block in page.tsx")

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)

print("Patch 12 applied!")
