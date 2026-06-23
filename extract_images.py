import fitz  # PyMuPDF
import os

pdf_path = "D:\\English TIMO\\Khối 1 - Tài liệu TIMO.pdf"
output_dir = "public/images/timo/grade1/test1"
os.makedirs(output_dir, exist_ok=True)

# Test 1 is on pages 13-16 (index 12 to 15 in 0-based indexing)
# Mapping of page index to question IDs that have images:
# Page 13 (index 12): Q1
# Page 14 (index 13): (none)
# Page 15 (index 14): Q16, Q17, Q18, Q19
# Page 16 (index 15): Q20, Q25

doc = fitz.open(pdf_path)

for page_idx in range(12, 16):
    page = doc[page_idx]
    image_list = page.get_images(full=True)
    
    print(f"Page {page_idx + 1} has {len(image_list)} images.")
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        
        filename = f"page_{page_idx + 1}_img_{img_idx + 1}.{image_ext}"
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, "wb") as f:
            f.write(image_bytes)
        print(f"Saved: {filepath}")

print("Extraction completed!")
