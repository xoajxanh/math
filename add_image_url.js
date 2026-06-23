const fs = require('fs');

let t = fs.readFileSync('src/data/timoData.ts', 'utf-8');
const parts = t.split('// Test 2');
if (parts.length > 1) {
    let t2 = parts[1].split('heat: [')[0];
    
    // We will find each question block in t2
    // A question block looks like:
    //     {
    //         id: 4,
    //         category: "...",
    //         questionEn: "...",
    //         questionVn: "...",
    //         options: [
    
    let newT2 = t2.replace(/(\{\s*id:\s*(\d+),\s*category:.*?\n\s*questionEn:.*?\n\s*questionVn:.*?\n)(\s*options:)/g, (match, prefix, id, suffix) => {
        const idNum = parseInt(id);
        const needsImage = [4, 7, 10, 16, 17, 18, 19, 20, 25].includes(idNum);
        if (needsImage) {
            return prefix + `        imageUrl: "/images/timo/grade1/test2/q${idNum}.png",\n` + suffix;
        }
        return match;
    });
    
    t = t.replace(t2, newT2);
    fs.writeFileSync('src/data/timoData.ts', t);
    console.log("Added imageUrl to Test 2 questions");
} else {
    console.log("Could not find Test 2 block");
}
