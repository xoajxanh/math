const fs = require('fs');

let t = fs.readFileSync('src/data/timoData.ts', 'utf-8');
const parts = t.split('// Test 2');
if (parts.length > 1) {
    let t2 = parts[1].split('heat: [')[0];
    let newT2 = t2.replace(/"[A-D]\.\s+/g, '"');
    t = t.replace(t2, newT2);
    fs.writeFileSync('src/data/timoData.ts', t);
    console.log("Cleaned options in timoData.ts");
} else {
    console.log("Could not find Test 2 block");
}
