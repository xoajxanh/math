const fs = require('fs');

const questionsText = fs.readFileSync('dump_test2.txt', 'utf-8');
const lines = questionsText.split('\n').map(l => l.trim()).filter(l => l);

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
            correctAnswer: "" 
        };
        
        let j = i + 1;
        let enLines = [];
        let vnLines = [];
        
        while (j < lines.length && !lines[j].match(/^[A-D]\./) && !lines[j].match(/^(\d+)\.$/)) {
            if (hasVnChar(lines[j]) || lines[j].includes("Hình dưới") || lines[j].includes("Hỏi có")) {
                vnLines.push(lines[j]);
            } else {
                if (vnLines.length > 0) {
                    vnLines.push(lines[j]);
                } else {
                    enLines.push(lines[j]);
                }
            }
            j++;
        }
        
        currentQ.questionEn = enLines.join(' ');
        currentQ.questionVn = vnLines.join(' ');
        
        while (j < lines.length && lines[j].match(/^[A-D]\./)) {
            const cleanOpt = lines[j].replace(/^[A-D]\.\s*/, '');
            currentQ.options.push(cleanOpt);
            j++;
        }
        
        if (currentQ.options.length > 0) {
            currentQ.correctAnswer = currentQ.options[0]; // just picking first for now
        }
        
        i = j - 1;
    }
}
if (currentQ) questions.push(currentQ);

let tsContent = fs.readFileSync('src/data/timoData.ts', 'utf-8');

// The replacement might be different, let's use regex or standard string replacement
const searchString = "// Test 2 (Empty placeholder)\r\n      []";
const searchString2 = "// Test 2 (Empty placeholder)\n      []";

const replacementStr = "// Test 2\n      " + JSON.stringify(questions, null, 4).replace(/"([^"]+)":/g, '$1:');

if (tsContent.includes(searchString)) {
    tsContent = tsContent.replace(searchString, replacementStr);
    fs.writeFileSync('src/data/timoData.ts', tsContent);
    console.log("Updated with searchString");
} else if (tsContent.includes(searchString2)) {
    tsContent = tsContent.replace(searchString2, replacementStr);
    fs.writeFileSync('src/data/timoData.ts', tsContent);
    console.log("Updated with searchString2");
} else {
    // If not found, maybe write to a temporary file
    fs.writeFileSync('test2_formatted.ts', replacementStr);
    console.log("Wrote to test2_formatted.ts");
}
