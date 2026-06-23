import os

with open('apply_patch5.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.startswith("let target1 = \\`"):
        new_lines.append("let target1 = `            {/* English Settings Control Panel */}`;\n")
    elif line.startswith("let target2 = \\`"):
        new_lines.append("let target2 = `              </section>\\r\n")
    elif line.startswith("let replace2 = \\`"):
        new_lines.append("let replace2 = `              </section>\\r\n")
    elif line.startswith("            </>\\r"):
        new_lines.append("            </>\\r\n")
    elif line.startswith("          )}\\r"):
        new_lines.append("          )}\\r\n")
    elif line.startswith("\\r"):
        new_lines.append("\\r\n")
    elif line.startswith("      </main>\\`"):
        new_lines.append("      </main>`;\n")
    else:
        new_lines.append(line)

with open('apply_patch5.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
