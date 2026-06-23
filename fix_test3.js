const fs = require('fs');

let t = fs.readFileSync('src/data/timoData.ts', 'utf-8');

// The array starts after "// Test 3"
const p1 = t.indexOf('// Test 3');
if (p1 !== -1) {
    const p2 = t.indexOf('heat: [', p1);
    const subStr = t.substring(p1, p2);
    
    // We will just split by `{` and count them.
    // Question 1 of Test 3 is the first `{`.
    // We want to keep 25 `{...}` blocks.
    
    let blocks = subStr.split('{\n        id: ');
    // blocks[0] is everything before the first id
    if (blocks.length > 26) {
        // Keep the first 25 questions, and discard the rest.
        let newSubStr = blocks.slice(0, 26).join('{\n        id: ');
        // Find the last '    }' in newSubStr and add ']\n    ],\n    '
        let lastBrace = newSubStr.lastIndexOf('    }');
        newSubStr = newSubStr.substring(0, lastBrace + 5) + '\n      ]\n    ],\n    ';
        
        t = t.substring(0, p1) + newSubStr + t.substring(p2);
        fs.writeFileSync('src/data/timoData.ts', t);
        console.log("Fixed Test 3 by slicing string");
    }
}
