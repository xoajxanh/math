import fitz

pdf_path = r"D:\English TIMO\Khối 1 - Tài liệu TIMO.pdf"
doc = fitz.open(pdf_path)

# Let's extract text from Page 35 to 45 (which should cover some Heat tests)
text = ""
for i in range(30, 45):
    text += f"\n--- Page {i+1} ---\n"
    text += doc[i].get_text()

with open("g1_heat_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
