import fitz
import os
import re
import json

base_dir = "D:\\English TIMO\\"
output_img_dir = "public/images/timo/"
output_json = "src/data/timoData.json"

grades = [1, 2, 3, 4, 5]
all_data = {}

def clean_text(text):
    return text.strip().replace('\n', ' ').replace('  ', ' ')

for grade in grades:
    pdf_path = os.path.join(base_dir, f"Khối {grade} - Tài liệu TIMO.pdf")
    if not os.path.exists(pdf_path):
        print(f"File not found: {pdf_path}")
        continue
    
    print(f"Processing Grade {grade}...")
    doc = fitz.open(pdf_path)
    
    grade_data = {
        "preliminary": [], # List of tests
        "heat": []         # List of tests
    }
    
    current_round = None
    current_test = None
    current_category = "General"
    
    current_q = None
    
    # We will just parse the text sequentially
    text_lines = []
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        text = page.get_text()
        lines = text.split('\n')
        text_lines.extend(lines)
        
        # Also extract images (best effort)
        # We don't know which round/test we are in precisely at image extraction time unless we sync,
        # but we can just save them by page
        img_list = page.get_images(full=True)
        if img_list:
            os.makedirs(os.path.join(output_img_dir, f"grade{grade}"), exist_ok=True)
            for img_idx, img in enumerate(img_list):
                xref = img[0]
                try:
                    base_image = doc.extract_image(xref)
                    image_bytes = base_image["image"]
                    image_ext = base_image["ext"]
                    filename = f"page_{page_idx+1}_img_{img_idx+1}.{image_ext}"
                    filepath = os.path.join(output_img_dir, f"grade{grade}", filename)
                    with open(filepath, "wb") as f:
                        f.write(image_bytes)
                except Exception as e:
                    print(f"Error extracting image: {e}")
                    
    # Heuristic parsing of text_lines
    i = 0
    while i < len(text_lines):
        line = text_lines[i].strip()
        if not line:
            i += 1
            continue
            
        upper_line = line.upper()
        if "VÒNG LOẠI QUỐC GIA" in upper_line or "PRELIMINARY ROUND" in upper_line:
            current_round = "preliminary"
        elif "VÒNG CHUNG KẾT QUỐC GIA" in upper_line or "HEAT ROUND" in upper_line:
            current_round = "heat"
            
        elif re.match(r"^ĐỀ SỐ\s*\d+", upper_line) or re.match(r"^MOCK TEST\s*\d+", upper_line):
            if current_round:
                # new test
                current_test = []
                grade_data[current_round].append(current_test)
                
        elif "LOGICAL THINKING" in upper_line or "TƢ DUY LÔ-GIC" in upper_line or "TƯ DUY LÔ-GIC" in upper_line:
            current_category = "Logical thinking"
        elif "ARITHMETIC" in upper_line or "SỐ HỌC" in upper_line:
            current_category = "Arithmetic"
        elif "NUMBER THEORY" in upper_line or "LÝ THUYẾT SỐ" in upper_line:
            current_category = "Number theory"
        elif "GEOMETRY" in upper_line or "HÌNH HỌC" in upper_line:
            current_category = "Geometry"
        elif "COMBINATORICS" in upper_line or "TỔ HỢP" in upper_line:
            current_category = "Combinatorics"
            
        elif re.match(r"^(\d+)\.$", line):
            # Question number
            q_num = re.match(r"^(\d+)\.$", line).group(1)
            
            # Read until A.
            q_text = ""
            i += 1
            while i < len(text_lines) and not re.match(r"^[A-D]\.", text_lines[i].strip()) and not re.match(r"^(\d+)\.$", text_lines[i].strip()):
                q_text += text_lines[i].strip() + " "
                i += 1
                
            q_text = clean_text(q_text)
            
            # split En and Vn heuristically (hard, let's just put it in questionEn for now, or split by some heuristic)
            questionEn = q_text
            questionVn = ""
            
            # Read options A B C D
            options = []
            while i < len(text_lines):
                opt_line = text_lines[i].strip()
                if re.match(r"^[A-D]\.", opt_line):
                    options.append(opt_line)
                    i += 1
                elif opt_line == "":
                    i += 1
                else:
                    break
                    
            if current_test is not None:
                current_test.append({
                    "id": int(q_num),
                    "category": current_category,
                    "questionEn": questionEn,
                    "questionVn": questionVn,
                    "options": options,
                    "correctAnswer": options[0] if options else "" # Placeholder
                })
            continue # skip i += 1 at the end of loop
            
        i += 1

    all_data[grade] = grade_data

with open(output_json, "w", encoding="utf-8") as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print("Finished parsing all PDFs.")
