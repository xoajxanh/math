with open('src/app/mu/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# 1. Insert handleSetMapCooldown inside MuPage
pattern_handle = r'  // Calculate upcoming bosses'
replacement_handle = r'''  const handleSetMapCooldown = (mapId: string, mapBosses: Boss[]) => {
    const firstBossId = mapBosses[0]?.id;
    const currentCd = bossStates[firstBossId]?.defaultCooldown || DEFAULT_COOLDOWN;
    const currentM = Math.floor(currentCd / 60).toString().padStart(2, '0');
    const currentS = (currentCd % 60).toString().padStart(2, '0');
    
    const input = prompt(`Nhập thời gian hồi (phút:giây) chung cho cả map, ví dụ 15:30. Tối đa 29:59`, `${currentM}:${currentS}`);
    if (input !== null) {
      const parts = input.split(':');
      const m = parseInt(parts[0] || "0", 10);
      const s = parseInt(parts[1] || "0", 10);
      if (!isNaN(m) && !isNaN(s) && m >= 0 && m <= 29 && s >= 0 && s <= 59) {
        const newCd = m * 60 + s;
        if (newCd > 0) {
          setBossStates(prev => {
            const next = { ...prev };
            mapBosses.forEach(b => {
              next[b.id] = { ...(next[b.id] || { spawnTime: 0, defaultCooldown: DEFAULT_COOLDOWN }), defaultCooldown: newCd };
            });
            return next;
          });
        } else {
          alert("Thời gian phải lớn hơn 0!");
        }
      } else {
        alert("Định dạng không hợp lệ. Vui lòng nhập theo định dạng MM:SS (ví dụ 15:30). Phút tối đa là 29, Giây tối đa là 59.");
      }
    }
  };

  // Calculate upcoming bosses'''
content = content.replace('  // Calculate upcoming bosses', replacement_handle)

# 2. Update Map Header
pattern_map = r'<h2 className="text-xl font-black mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">\n\s*<span className="text-2xl">\{mapArea.name.slice\(-2\)\}</span>\s*\{mapArea.name.slice\(0, -2\)\}\n\s*</h2>'
replacement_map = r'''<h2 className="text-xl font-black mb-4 flex items-center justify-between border-b border-slate-700 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{mapArea.name.slice(-2)}</span> 
                    {mapArea.name.slice(0, -2)}
                  </div>
                  <button 
                    onClick={() => handleSetMapCooldown(mapArea.id, mapBosses)}
                    title="Cài đặt thời gian hồi cho cả map"
                    className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                  >
                    ⚙️
                  </button>
                </h2>'''
content = re.sub(pattern_map, replacement_map, content)

# 3. Remove setMaxCooldown function and button from BossCard
pattern_remove_fn = r'  const setMaxCooldown = \(\) => \{[\s\S]*?\n  \};\n\n  const killBoss'
replacement_remove_fn = r'  const killBoss'
content = re.sub(pattern_remove_fn, replacement_remove_fn, content)

pattern_remove_btn = r'        <h3 className="font-bold text-slate-200 text-sm leading-tight max-w-\[70%\]">\{boss\.name\}</h3>\n        <button \n          onClick=\{setMaxCooldown\}\n          title="Cài đặt thời gian hồi"\n          className="text-slate-500 hover:text-amber-400 transition-colors p-1"\n        >\n          ⚙️\n        </button>\n      </div>'
replacement_remove_btn = r'''        <h3 className="font-bold text-slate-200 text-sm leading-tight w-full">{boss.name}</h3>
      </div>'''
content = re.sub(pattern_remove_btn, replacement_remove_btn, content)

with open('src/app/mu/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated successfully!")
