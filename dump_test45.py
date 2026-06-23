import fitz

doc = fitz.open("D:\\English TIMO\\Khối 1 - Tài liệu TIMO.pdf")


text4 = ""
for i in range(26, 31):
    text4 += doc[i].get_text()
with open("d:\\SOURCES\\math\\dump_test4.txt", "w", encoding="utf-8") as f:
    f.write(text4)

text5 = ""
for i in range(31, 36):
    text5 += doc[i].get_text()
with open("d:\\SOURCES\\math\\dump_test5.txt", "w", encoding="utf-8") as f:
    f.write(text5)
