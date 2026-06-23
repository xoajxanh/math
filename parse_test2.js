const fs = require('fs');

const text = fs.readFileSync('dump_test2.txt', 'utf-8');
const lines = text.split('\n').map(l => l.trim()).filter(l => l);

const hasVnChar = (str) => /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str);

const questions = [];
let currentQ = null;
let category = "General";

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("Logical thinking") || line.includes("Tƣ duy lô-gic") || line.includes("Tư duy lô-gic")) {
        category = "Logical thinking";
        continue;
    }
    if (line.includes("Arithmetic") || line.includes("Số học")) {
        category = "Arithmetic";
        continue;
    }
    if (line.includes("Number theory") || line.includes("Lý thuyết số")) {
        category = "Number theory";
        continue;
    }
    if (line.includes("Geometry") || line.includes("Hình học")) {
        category = "Geometry";
        continue;
    }
    if (line.includes("Combinatorics") || line.includes("Tổ hợp")) {
        category = "Combinatorics";
        continue;
    }

    const match = line.match(/^(\d+)\.$/);
    if (match) {
        if (currentQ) questions.push(currentQ);
        currentQ = {
            id: parseInt(match[1]),
            category: category,
            questionEn: "",
            questionVn: "",
            options: [],
            correctAnswer: "" // Will need manual fix
        };
        
        let j = i + 1;
        let enLines = [];
        let vnLines = [];
        
        while (j < lines.length && !lines[j].match(/^[A-D]\./) && !lines[j].match(/^(\d+)\.$/)) {
            // Check if line is English or Vietnamese
            // Heuristic: If it has Vietnamese specific letters, it's VN. Else EN.
            // Also need to handle multi-line sentences.
            if (hasVnChar(lines[j]) || lines[j].includes("Hình dưới") || lines[j].includes("Hỏi có")) {
                vnLines.push(lines[j]);
            } else {
                // some English text could be recognized as VN if it's mixed, but usually they are on separate lines
                if (vnLines.length > 0) {
                    // if we already started vn, it might be a continuation of vn, but wait, usually EN is before VN
                    vnLines.push(lines[j]);
                } else {
                    enLines.push(lines[j]);
                }
            }
            j++;
        }
        
        currentQ.questionEn = enLines.join(' ');
        currentQ.questionVn = vnLines.join(' ');
        
        // Read options
        while (j < lines.length && lines[j].match(/^[A-D]\./)) {
            const cleanOpt = lines[j].replace(/^[A-D]\.\s*/, '');
            currentQ.options.push(cleanOpt);
            j++;
        }
        
        // Assign default correct answer to Option A
        if (currentQ.options.length > 0) {
            currentQ.correctAnswer = currentQ.options[0];
        }
        
        i = j - 1; // advance i
    }
}
if (currentQ) questions.push(currentQ);

// Print to verify
console.log(JSON.stringify(questions, null, 2));

const outPath = 'src/data/timoData.ts';
let tsContent = fs.readFileSync(outPath, 'utf-8');

// Replace "// Test 2 (Empty placeholder)\n      []" with the generated array
const replaceStr = "// Test 2 (Empty placeholder)\n      []";
const newStr = "// Test 2\n      " + JSON.stringify(questions, null, 4).replace(/"([^"]+)":/g, '$1:');

if (tsContent.includes(replaceStr)) {
    tsContent = tsContent.replace(replaceStr, newStr);
    fs.writeFileSync(outPath, tsContent);
    console.log("Updated timoData.ts");
} else {
    console.log("Could not find the placeholder to replace.");
}

