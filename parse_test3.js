const fs = require('fs');

const questionsText = fs.readFileSync('dump_test3.txt', 'utf-8');
const lines = questionsText.split('\n').map(l => l.trim()).filter(l => l);

const hasVnChar = (str) => /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str);

const questions = [];
let currentQ = null;
let category = "General";

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.includes("Logical Thinking") || line.includes("Tƣ duy lô-gic") || line.includes("Tư duy lô-gic")) {
        category = "Logical thinking";
        continue;
    }
    if (line.includes("Arithmetic") || line.includes("Số học")) {
        category = "Arithmetic";
        continue;
    }
    if (line.includes("Number Theory") || line.includes("Lý thuyết số")) {
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

    const match = line.match(/^(\d+)\.\s*(.*)$/);
    if (match) {
        if (currentQ) questions.push(currentQ);
        currentQ = {
            id: parseInt(match[1]),
            category: category,
            questionEn: match[2] ? match[2] : "",
            questionVn: "",
            options: [],
            correctAnswer: "" 
        };
        
        let j = i + 1;
        let enLines = currentQ.questionEn ? [currentQ.questionEn] : [];
        let vnLines = [];
        
        while (j < lines.length && !lines[j].match(/^[A-D]\./) && !lines[j].match(/^(\d+)\.\s*/)) {
            if (hasVnChar(lines[j]) || lines[j].includes("Hình dưới") || lines[j].includes("Hỏi có") || lines[j].includes("Quan sát") || lines[j].includes("Dựa vào")) {
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
        
        currentQ.questionEn = enLines.join(' ').trim();
        currentQ.questionVn = vnLines.join(' ').trim();
        
        const contentForImageMatch = currentQ.questionEn.toLowerCase() + " " + currentQ.questionVn.toLowerCase();
        if (contentForImageMatch.includes("figure") || contentForImageMatch.includes("dưới đây") || contentForImageMatch.includes("equation") || contentForImageMatch.includes("pattern") || contentForImageMatch.includes("bên phải") || contentForImageMatch.includes("bên trái")) {
            currentQ.imageUrl = `/images/timo/grade1/test3/q${currentQ.id}.png`;
        }
        
        while (j < lines.length && lines[j].match(/^[A-D]\./)) {
            const cleanOpt = lines[j].replace(/^[A-D]\.\s*/, '');
            currentQ.options.push(cleanOpt);
            j++;
        }
        
        if (currentQ.options.length > 0) {
            currentQ.correctAnswer = currentQ.options[0];
        }
        
        i = j - 1;
    }
}
if (currentQ) questions.push(currentQ);

let tsContent = fs.readFileSync('src/data/timoData.ts', 'utf-8');

// Filter out only Test 3 questions (up to 25)
const test3Questions = questions.filter(q => q.id <= 25).slice(0, 25);

const test3Json = JSON.stringify(test3Questions, null, 4).replace(/"([^"]+)":/g, '$1:');

// Replace the existing Test 3 block. We need to find `// Test 3` and replace it up to `heat: [`.
const p1 = tsContent.indexOf('// Test 3');
if (p1 !== -1) {
    const p2 = tsContent.indexOf('heat: [', p1);
    const newBlock = `// Test 3\n      ${test3Json}\n    ],\n    `;
    tsContent = tsContent.substring(0, p1) + newBlock + tsContent.substring(p2);
    fs.writeFileSync('src/data/timoData.ts', tsContent);
    console.log(`Re-inserted Test 3 with ${test3Questions.length} questions`);
} else {
    console.log("Could not find // Test 3 marker");
}
