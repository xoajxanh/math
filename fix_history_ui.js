const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');

const t1 = `Khối {item.grade} | {item.round === "preliminary" ? "Vòng loại" : "Chung kết"} | Đề {item.testIndex + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">`;

const r1 = `Khối {item.grade} | {item.round === "preliminary" ? "Vòng loại" : "Chung kết"} | Đề {item.testIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-600 mt-1 flex items-center gap-1">
                          👦 {item.studentName}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">`;

const t2 = `q.questionVn}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">`;

const r2 = `q.questionVn}</p>
                        {q.imageUrl && (
                          <div className="mt-2 flex justify-center">
                            <img src={q.imageUrl} alt="Question" className="max-h-32 object-contain rounded border border-slate-200" />
                          </div>
                        )}
                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mt-3 mb-2">
                            {q.options.map((opt, optIdx) => {
                              const optLabel = ["A", "B", "C", "D"][optIdx];
                              const optImg = q.optionImages ? q.optionImages[optIdx] : null;
                              return (
                                <div key={optIdx} className="flex items-center gap-2 p-2 border border-slate-200 rounded bg-white">
                                  <span className="font-bold text-slate-500 text-xs">{optLabel}.</span>
                                  {optImg ? (
                                    <img src={optImg} alt={\`Option \${optLabel}\`} className="max-h-12 object-contain" />
                                  ) : (
                                    <span className="text-xs font-medium text-slate-700">{opt !== optLabel ? opt : ""}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">`;

content = content.replace(t1, r1);
content = content.replace(t2, r2);

fs.writeFileSync('src/app/page.tsx', content);
