import fitz

doc = fitz.open("D:\\English TIMO\\Khối 1 - Tài liệu TIMO.pdf")
text = ""
for i in range(21, 26):
    text += doc[i].get_text()

with open("d:\\SOURCES\\math\\dump_test3.txt", "w", encoding="utf-8") as f:
    f.write(text)
print("Done")
