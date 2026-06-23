import fitz
import re

doc = fitz.open("D:\\English TIMO\\Khối 1 - Tài liệu TIMO.pdf")
found_pages = []
for i in range(len(doc)):
    text = doc[i].get_text()
    if "ĐỀ SỐ 2" in text or "MOCK TEST 2" in text or "Đề thi số 2" in text:
        found_pages.append(i)

print("Found on pages:", found_pages)
