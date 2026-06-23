import fitz

doc = fitz.open("D:\\English TIMO\\Khối 1 - Tài liệu TIMO.pdf")

text5 = ""
for i in range(31, 40):
    text5 += doc[i].get_text()
with open("d:\\SOURCES\\math\\dump_test5.txt", "w", encoding="utf-8") as f:
    f.write(text5)
