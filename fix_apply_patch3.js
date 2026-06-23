const fs = require('fs');
let content = fs.readFileSync('apply_patch3.js', 'utf-8');
content = content.replace(/\\\`            <\/section>\\n          <\/>\\n        )}\\n\\n        {\/\* History Drawer Modal \*\//g, '`            </section>\\n          </>\\n        )}\\n\\n        {/* History Drawer Modal *//');
content = content.replace(/\\\`            <\/section>\\n\\\` \+ timoUiStr \+ \\\`\\n          <\/>\\n        )}\\n\\n        {\/\* History Drawer Modal \*\//g, '`            </section>\\n` + timoUiStr + `\\n          </>\\n        )}\\n\\n        {/* History Drawer Modal *//');
fs.writeFileSync('apply_patch3.js', content);
