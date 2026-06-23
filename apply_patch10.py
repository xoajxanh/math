import os

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

timo_handlers = """
  // TIMO Handlers
  const handleStartTimo = async () => {
    if (!studentName) {
      alert("Vui lòng nhập tên của bé trước!");
      return;
    }
    const testData = getTimoTest(timoGrade, timoRound, timoTestIndex);
    if (!testData || !testData.questions || testData.questions.length === 0) {
      alert("Đề thi này chưa có dữ liệu. Hãy chọn đề khác nhé!");
      return;
    }

    const sessionId = Date.now().toString();
    setTimoSessionId(sessionId);

    // Save history with "Làm lại" state (not checked yet)
    await fetch("/api/timo-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName,
        sessionId,
        grade: timoGrade,
        round: timoRound,
        testIndex: timoTestIndex,
        questions: testData.questions.map(q => ({
          ...q,
          userAnswer: null,
          isCorrect: null
        })),
        score: 0,
        totalQuestions: testData.questions.length,
        isChecked: false
      }),
    });

    loadTimoHistoryList(); // Reload history
    setTimoQuestions(testData.questions.map(q => ({ ...q, userAnswer: null, isCorrect: null })));
    setTimoScore(0);
    setIsTimoChecked(false);
    setActiveTimoIndex(0);
    setHasStartedTimo(true);
    playPopSound();
  };

  const handleTimoOptionSelect = (qId: string, answer: string) => {
    if (isTimoChecked) return;
    setTimoQuestions(prev => prev.map(q => q.id === qId ? { ...q, userAnswer: answer } : q));
    playPopSound();
  };

  const handleNextTimo = () => {
    if (activeTimoIndex < timoQuestions.length - 1) {
      setActiveTimoIndex(activeTimoIndex + 1);
      playPopSound();
    } else {
      if (confirm("Bé có chắc chắn muốn nộp bài không?")) {
        handleCheckTimo();
      }
    }
  };

  const handleCheckTimo = async () => {
    let correctCount = 0;
    const checkedQs = timoQuestions.map(q => {
      const isCorrect = q.userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return { ...q, isCorrect };
    });

    setTimoQuestions(checkedQs);
    setTimoScore(correctCount);
    setIsTimoChecked(true);

    if (correctCount === timoQuestions.length) playFeedbackSound("correct");
    else playFeedbackSound("incorrect");

    await fetch("/api/timo-history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName,
        sessionId: timoSessionId,
        grade: timoGrade,
        round: timoRound,
        testIndex: timoTestIndex,
        questions: checkedQs,
        score: correctCount,
        totalQuestions: checkedQs.length,
        isChecked: true
      }),
    });

    loadTimoHistoryList();
  };

  const handleStopTimo = () => {
    if (!isTimoChecked) {
      if (!confirm("Bé đang làm bài chưa nộp. Bé có chắc chắn muốn thoát không? Kết quả sẽ không được lưu!")) {
        return;
      }
    }
    setHasStartedTimo(false);
    setTimoQuestions([]);
    setIsTimoChecked(false);
    setActiveTimoIndex(0);
    setTimoScore(0);
  };

  const loadTimoHistoryList = async () => {
    if (!studentName) return;
    try {
      const res = await fetch("/api/timo-history");
      if (res.ok) {
        const data = await res.json();
        setTimoHistoryList(data);
      }
    } catch (error) {
      console.error("Failed to load TIMO history", error);
    }
  };

"""

idx = content.find("  const handleStartEnglish = async () => {")
if idx != -1:
    content = content[:idx] + timo_handlers + "\n" + content[idx:]
    with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patch 10 applied!")
else:
    print("Could not find handleStartEnglish")
