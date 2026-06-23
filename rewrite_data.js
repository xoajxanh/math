const fs = require('fs');

const raw = fs.readFileSync('temp_g1.txt', 'utf-8');
const match = raw.match(/export const TIMO_GRADE_1: TimoQuestion\[\] = (\[[\s\S]*?\]);/);
let grade1Questions = [];
if (match) {
    grade1Questions = match[1]; // string representation
}

const newContent = `export interface TimoQuestion {
  id: number;
  category: string;
  questionEn: string;
  questionVn: string;
  imageUrl?: string;
  options: string[];
  optionImages?: string[];
  correctAnswer: string;
}

export type TimoRound = "preliminary" | "heat";

export interface TimoData {
  [grade: number]: {
    [round in TimoRound]: TimoQuestion[][]; // Array of tests, each test is an array of questions
  };
}

export const TIMO_DATA: TimoData = {
  1: {
    preliminary: [
      // Test 1
      ${grade1Questions},
      // Test 2 (Empty placeholder)
      []
    ],
    heat: [
      // Test 1 (Empty placeholder)
      []
    ]
  },
  2: {
    preliminary: [ [] ],
    heat: [ [] ]
  },
  3: {
    preliminary: [ [] ],
    heat: [ [] ]
  },
  4: {
    preliminary: [ [] ],
    heat: [ [] ]
  },
  5: {
    preliminary: [ [] ],
    heat: [ [] ]
  }
};

export function getTimoTest(grade: number, round: TimoRound, testIndex: number): TimoQuestion[] {
  return TIMO_DATA[grade]?.[round]?.[testIndex] || [];
}

export function getTimoTestCount(grade: number, round: TimoRound): number {
  return TIMO_DATA[grade]?.[round]?.length || 0;
}
`;

fs.writeFileSync('src/data/timoData.ts', newContent);
