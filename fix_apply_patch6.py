import os

with open('apply_patch6.py', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('                </section>\n"""', '                </section>\n              </div>\n            )}\n"""')

with open('apply_patch6.py', 'w', encoding='utf-8') as f:
    f.write(content)
