const fs = require('fs');

const hasVnChar = (str) => /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str);

function parseDump(filename, testIndex) {
    const questionsText = fs.readFileSync(filename, 'utf-8');
    const lines = questionsText.split('\n').map(l => l.trim()).filter(l => l);

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
                if (hasVnChar(lines[j]) || lines[j].includes("Hình dưới") || lines[j].includes("Hỏi có") || lines[j].includes("Quan sát") || lines[j].includes("Dựa vào") || lines[j].includes("Biết rằng") || lines[j].includes("Tìm giá trị") || lines[j].includes("Điền dấu")) {
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
                currentQ.imageUrl = `/images/timo/grade1/test${testIndex}/q${currentQ.id}.png`;
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
    return questions.filter(q => q.id <= 25).slice(0, 25);
}

const test4 = parseDump('dump_test4.txt', 4);
const test5 = parseDump('dump_test5.txt', 5);

let tsContent = fs.readFileSync('src/data/timoData.ts', 'utf-8');

const test4Json = JSON.stringify(test4, null, 4).replace(/"([^"]+)":/g, '$1:');
const test5Json = JSON.stringify(test5, null, 4).replace(/"([^"]+)":/g, '$1:');

// Replace the existing Test 4 and 5 in timoData.ts
const t4start = tsContent.indexOf('// Test 4');
if (t4start !== -1) {
    const end = tsContent.indexOf('heat: [', t4start);
    const newBlock = `// Test 4\n      ${test4Json},\n      // Test 5\n      ${test5Json}\n    ],\n    `;
    tsContent = tsContent.substring(0, t4start) + newBlock + tsContent.substring(end);
    fs.writeFileSync('src/data/timoData.ts', tsContent);
    console.log(`Replaced Test 4 (${test4.length} questions) and Test 5 (${test5.length} questions)`);
} else {
    console.log("Could not find Test 4");
}
