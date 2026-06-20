"use client";

import { useState, useEffect } from "react";

interface Question {
  id: number;
  x: number;
  y: number;
  op: "+" | "-" | "×" | ":";
  answer: number;
  userAnswer: string;
  checked: boolean;
  isCorrect?: boolean;
  shake?: boolean;
}

interface Balloon {
  id: number;
  color: string;
  left: number;
  delay: number;
  scale: number;
}

interface Confetti {
  id: number;
  color: string;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  shape: "circle" | "square" | "triangle";
}

interface HistoryRecord {
  id: string;
  studentName: string;
  timestamp: string;
  operator: "add" | "subtract" | "multiply" | "divide";
  range: "10" | "100" | "1000";
  score: number;
  total: number;
  duration?: number;
  questions: {
    x: number;
    y: number;
    op: "+" | "-" | "×" | ":";
    answer: number;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

const BALLOON_COLORS = [
  "#ff4d6d", // Hồng
  "#ff7b00", // Cam
  "#ffb703", // Vàng
  "#2ec4b6", // Xanh ngọc
  "#3a86c8", // Xanh dương
  "#7209b7", // Tím
  "#ff006e", // Đỏ hồng
  "#4caf50", // Xanh lá
];

const CONFETTI_COLORS = [
  "#fecaca", // Hồng nhạt
  "#fed7aa", // Cam nhạt
  "#fef08a", // Vàng nhạt
  "#bbf7d0", // Xanh lá nhạt
  "#bfdbfe", // Xanh dương nhạt
  "#e9d5ff", // Tím nhạt
  "#fbcfe8", // Hồng sen nhạt
];

export default function Home() {
  // Trạng thái định danh học sinh
  const [studentName, setStudentName] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Cấu hình phép toán
  const [operator, setOperator] = useState<"add" | "subtract" | "multiply" | "divide">("add");
  const [range, setRange] = useState<"10" | "100" | "1000">("10");
  const [count, setCount] = useState<number>(10);

  // Trạng thái bài tập
  const [questions, setQuestions] = useState<Question[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Quản lý sự kiện cuộn trang để hiện nút về đầu trang
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quản lý đếm giờ
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (hasStarted && !checked && startTime !== null) {
      intervalId = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setTimer(elapsed);
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [hasStarted, checked, startTime]);

  // Lịch sử học tập
  const [historyList, setHistoryList] = useState<HistoryRecord[]>([]);
  const [selectedHistory, setSelectedHistory] = useState<HistoryRecord | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Giới hạn trang hiện tại không vượt quá tổng số trang
  useEffect(() => {
    const totalPages = Math.ceil(historyList.length / pageSize);
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [historyList, pageSize, currentPage]);

  // Hiệu ứng và âm thanh
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Load thông tin học sinh và danh sách lịch sử khi mở web
  useEffect(() => {
    setIsMounted(true);
    const savedName = localStorage.getItem("studentName");
    if (savedName) {
      setStudentName(savedName);
    }
  }, []);

  // Tự động tải danh sách lịch sử từ API khi studentName thay đổi
  useEffect(() => {
    if (studentName) {
      loadHistoryList();
    }
  }, [studentName]);

  const loadHistoryList = async () => {
    try {
      const res = await fetch("/api/history");
      if (res.ok) {
        const data = await res.json();
        setHistoryList(data);
      }
    } catch (e) {
      console.error("Lỗi khi tải lịch sử bài làm từ server:", e);
    }
  };

  // Xóa toàn bộ lịch sử bài làm (yêu cầu mật khẩu admin)
  const handleClearHistory = async () => {
    const password = prompt("Bố mẹ hoặc thầy cô hãy nhập mật khẩu Admin để xóa toàn bộ lịch sử bài làm:");
    if (password === null) return;
    if (password !== "12345ZXC") {
      playFeedbackSound("incorrect");
      alert("Sai mật khẩu rồi bé ơi! Chỉ thầy cô hoặc bố mẹ mới được phép xóa nhé. 😉");
      return;
    }

    try {
      const res = await fetch("/api/history", {
        method: "DELETE",
      });
      if (res.ok) {
        setHistoryList([]);
        playFeedbackSound("correct");
        alert("Đã xóa sạch nhật ký học tập của bé rồi nhé! 🧼");
      } else {
        alert("Gặp lỗi khi xóa nhật ký trên hệ thống.");
      }
    } catch (e) {
      console.error("Lỗi kết nối API xóa lịch sử:", e);
      alert("Không kết nối được với máy chủ.");
    }
  };

  // Lưu học sinh mới vào localStorage
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = inputName.trim();
    if (!name) {
      playFeedbackSound("incorrect");
      alert("Bé hãy gõ tên của mình để bắt đầu nhé! 😉");
      return;
    }
    localStorage.setItem("studentName", name);
    setStudentName(name);
    playPopSound();
  };

  // Đăng xuất / Thoát tài khoản học sinh
  const handleLogout = () => {
    localStorage.removeItem("studentName");
    setStudentName("");
    setInputName("");
    setQuestions([]);
    setHasStarted(false);
    setChecked(false);
    setBalloons([]);
    setConfetti([]);
    setSelectedHistory(null);
    setIsNavOpen(false);
    setIsHistoryOpen(false);
    playPopSound();
  };

  // Tạo phép toán mới
  const handleGenerate = () => {
    const limit = range === "10" ? 10 : range === "100" ? 100 : 1000;
    const newQuestions: Question[] = [];

    for (let i = 0; i < count; i++) {
      let x = 0;
      let y = 0;
      let opSign: "+" | "-" | "×" | ":" = "+";
      let answer = 0;

      if (operator === "add") {
        x = Math.floor(Math.random() * (limit - 1)) + 1;
        y = Math.floor(Math.random() * x);
        opSign = "+";
        answer = x + y;
      } else if (operator === "subtract") {
        x = Math.floor(Math.random() * (limit - 1)) + 1;
        y = Math.floor(Math.random() * x);
        opSign = "-";
        answer = x - y;
      } else if (operator === "multiply") {
        // Sinh phép nhân phù hợp cho học sinh cấp 1
        if (limit === 10) {
          // Phép nhân bảng nhỏ (thừa số dưới 10)
          x = Math.floor(Math.random() * 8) + 2; // [2, 9]
          y = Math.floor(Math.random() * (x - 1)) + 1; // [1, x-1]
        } else {
          // Để phép tính không quá đồ sộ, ta giới hạn thừa số y dưới 10, thừa số x tối đa limit / 2
          x = Math.floor(Math.random() * (Math.floor(limit / 2) - 1)) + 2;
          y = Math.floor(Math.random() * 8) + 2; // [2, 9]
          if (y > x) {
            const temp = x;
            x = y;
            y = temp;
          }
        }
        opSign = "×";
        answer = x * y;
      } else if (operator === "divide") {
        // Phép chia hết không dư và không chia cho 0, số bị chia lớn hơn số chia
        const actualMaxY = limit === 10 ? 4 : limit === 100 ? 10 : 30; 
        y = Math.floor(Math.random() * (actualMaxY - 1)) + 2; // [2, actualMaxY]
        
        const maxQ = Math.floor((limit - 1) / y);
        const actualMaxQ = limit === 10 ? 4 : limit === 100 ? 10 : 30;
        const q = Math.floor(Math.random() * (Math.min(maxQ, actualMaxQ) - 1)) + 2; // thương q >= 2
        
        x = y * q; // đảm bảo chia hết và x > y
        opSign = ":";
        answer = q;
      }

      newQuestions.push({
        id: i,
        x,
        y,
        op: opSign,
        answer,
        userAnswer: "",
        checked: false,
      });
    }

    setQuestions(newQuestions);
    setChecked(false);
    setScore(0);
    setBalloons([]);
    setConfetti([]);
    setHasStarted(true);
    setTimer(0);
    setStartTime(Date.now());

    playPopSound();

    // Tự động focus vào ô đầu tiên
    setTimeout(() => {
      const firstInput = document.getElementById("input-q-0");
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  };

  // Tạo âm thanh bằng Web Audio API
  const playPopSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  };

  const playFeedbackSound = (type: "correct" | "incorrect" | "victory") => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === "correct") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "incorrect") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(196.0, now); // G3
        osc.frequency.exponentialRampToValueAtTime(98.0, now + 0.35); // G2
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "victory") {
        const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        const now = ctx.currentTime;
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);
          gain.gain.setValueAtTime(0, now + idx * 0.1);
          gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.1 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.22);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.25);
        });
      }
    } catch (e) {}
  };

  // Kiểm tra kết quả làm bài & Lưu vào server API
  const handleCheckAnswers = async () => {
    if (questions.length === 0) return;

    const finalDuration = startTime ? Math.floor((Date.now() - startTime) / 1000) : timer;
    setTimer(finalDuration);

    let correctCount = 0;
    const updatedQuestions = questions.map((q) => {
      const parsedAns = parseInt(q.userAnswer.trim(), 10);
      const isCorrect = parsedAns === q.answer;
      if (isCorrect) {
        correctCount++;
      }
      return {
        ...q,
        checked: true,
        isCorrect,
        shake: !isCorrect,
      };
    });

    setQuestions(updatedQuestions);
    setChecked(true);
    setScore(correctCount);

    // Tắt rung lắc sau 400ms
    setTimeout(() => {
      setQuestions((prev) => prev.map((q) => ({ ...q, shake: false })));
    }, 400);

    const ratio = correctCount / questions.length;

    // Kích hoạt pháo hoa, bóng bay
    if (ratio === 1) {
      playFeedbackSound("victory");
      triggerBalloons();
      triggerConfetti();
    } else if (ratio >= 0.8) {
      playFeedbackSound("correct");
      triggerConfetti();
    } else {
      playFeedbackSound("incorrect");
    }

    // Gửi lịch sử làm bài lên server API để ghi file JSON
    try {
      const payload = {
        studentName: studentName,
        timestamp: new Date().toISOString(),
        operator: operator,
        range: range,
        score: correctCount,
        total: questions.length,
        duration: finalDuration,
        questions: updatedQuestions.map((q) => ({
          x: q.x,
          y: q.y,
          op: q.op,
          answer: q.answer,
          userAnswer: q.userAnswer,
          isCorrect: q.isCorrect || false,
        })),
      };

      const res = await fetch("/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Tải lại danh sách lịch sử từ API
        loadHistoryList();
      }
    } catch (e) {
      console.error("Lỗi khi lưu lịch sử làm bài:", e);
    }
  };

  // Hiệu ứng pháo hoa giấy và bóng bay
  const triggerBalloons = () => {
    const list: Balloon[] = [];
    for (let i = 0; i < 20; i++) {
      list.push({
        id: i,
        color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
        left: Math.random() * 85 + 5,
        delay: Math.random() * 3,
        scale: 0.8 + Math.random() * 0.5,
      });
    }
    setBalloons(list);
  };

  const triggerConfetti = () => {
    const list: Confetti[] = [];
    for (let i = 0; i < 80; i++) {
      list.push({
        id: i,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        left: Math.random() * 100,
        top: -(Math.random() * 40 + 10),
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 8 + Math.random() * 10,
        rotation: Math.random() * 360,
        shape: ["circle", "square", "triangle"][
          Math.floor(Math.random() * 3)
        ] as "circle" | "square" | "triangle",
      });
    }
    setConfetti(list);
  };

  // Xử lý bé gõ đáp án
  const handleInputChange = (id: number, val: string) => {
    if (val !== "" && !/^\d+$/.test(val)) return;
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, userAnswer: val } : q))
    );
  };

  // Điều hướng bằng phím Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = document.getElementById(`input-q-${id + 1}`) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      } else {
        handleCheckAnswers();
      }
    }
  };

  // Làm lại bài hiện tại
  const handleResetAnswers = () => {
    setQuestions((prev) =>
      prev.map((q) => ({
        ...q,
        userAnswer: "",
        checked: false,
        isCorrect: undefined,
        shake: false,
      }))
    );
    setChecked(false);
    setScore(0);
    setBalloons([]);
    setConfetti([]);
    setTimer(0);
    setStartTime(Date.now());
    playPopSound();

    setTimeout(() => {
      const firstInput = document.getElementById("input-q-0");
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  };

  // Định dạng ngày giờ Việt Nam
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();
      const hours = d.getHours().toString().padStart(2, "0");
      const minutes = d.getMinutes().toString().padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (e) {
      return isoString;
    }
  };

  // Định dạng thời gian thân thiện cho bé (ví dụ: "25 giây" hoặc "1 phút 5 giây")
  const formatDuration = (seconds?: number) => {
    if (seconds === undefined || seconds === null) return "Không rõ";
    if (seconds <= 0) return "0 giây";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) {
      return `${m} phút ${s} giây`;
    }
    return `${seconds} giây`;
  };

  // Định dạng đồng hồ đếm giây hoạt động (ví dụ: "01:25")
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Lời khích lệ cho bé
  const getScoreMessage = () => {
    const ratio = score / questions.length;
    if (ratio === 1) {
      return {
        title: "Quá Xuất Sắc! Bé Ơi 🏆🌟🎉",
        desc: "Bé đã trả lời đúng tất cả các câu hỏi rồi! Bé là thiên tài toán học đấy nhé!",
        color: "text-emerald-700 bg-emerald-50 border-emerald-300",
        emoji: "🌈",
      };
    }
    if (ratio >= 0.8) {
      return {
        title: "Tuyệt Vời Quá Bé Ơi! 👍💖🎈",
        desc: `Bé làm đúng ${score}/${questions.length} câu. Bé học toán siêu quá, hãy tiếp tục phát huy nhé!`,
        color: "text-sky-700 bg-sky-50 border-sky-300",
        emoji: "🌟",
      };
    }
    if (ratio >= 0.5) {
      return {
        title: "Khá Lắm Bé Ơi! 💪😊✨",
        desc: `Bé làm đúng ${score}/${questions.length} câu. Chỉ sai một vài câu thôi, bé hãy nhấn "Làm lại" để làm đúng hết nhé!`,
        color: "text-amber-700 bg-amber-50 border-amber-300",
        emoji: "☀️",
      };
    }
    return {
      title: "Bé Hãy Cố Gắng Lên Nhé! 🤗📚🧸",
      desc: `Bé làm đúng ${score}/${questions.length} câu. Đừng buồn nhé, bé hãy thử làm lại để đạt điểm cao hơn nhé. Bé làm được mà!`,
      color: "text-rose-700 bg-rose-50 border-rose-300",
      emoji: "🎈",
    };
  };

  // Phân trang lịch sử
  const totalPages = Math.ceil(historyList.length / pageSize);
  const paginatedHistory = historyList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Tránh lỗi hydration mismatch bằng cách kiểm tra component đã mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-50 font-sans">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-spin">🎈</div>
          <p className="text-slate-500 font-bold text-lg">Đang chuẩn bị lớp học của bé...</p>
        </div>
      </div>
    );
  }

  // Giao diện 1: Yêu cầu bé đăng ký/nhập tên khi chưa định danh
  if (!studentName) {
    return (
      <div className="min-h-screen pb-12 overflow-x-hidden font-sans select-none bg-gradient-to-b from-sky-100 via-amber-50/40 to-sky-100/50 flex flex-col items-center justify-center p-4">
        <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-lg bg-white border-3 border-slate-900 rounded-3xl p-8 text-center shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] relative overflow-hidden animate-pop">
          {/* Sunny icon decoration */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full border-3 border-slate-900 flex items-center justify-center font-bold text-3xl animate-spin-slow">
            ☀️
          </div>

          <div className="text-7xl mb-4 animate-bounce">🎒</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 tracking-wider font-sans mb-2">
            LỚP HỌC TOÁN BÉ YÊU
          </h1>
          <p className="text-sm font-bold text-slate-500 mb-8 uppercase tracking-wide">
            Cộng trừ vui nhộn - Quà tặng bất ngờ 🌟
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col gap-3 text-left">
              <label className="text-lg font-black text-slate-700 flex items-center gap-1.5">
                <span>✍️</span> Bé hãy gõ tên của mình để vào học nhé:
              </label>
              <input
                type="text"
                maxLength={20}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Ví dụ: Bé Na, Bé Bin, Tèo..."
                className="w-full px-5 py-4 border-3 border-slate-900 rounded-2xl text-xl font-bold placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.3)] bg-slate-50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl border-3 border-slate-900 bg-amber-400 text-slate-950 font-black text-lg shadow-[4px_4px_0px_0px_#1e293b] hover:bg-amber-300 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b] active:scale-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Bắt Đầu Học Thôi!</span>
              <span className="text-xl">🚀</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Giao diện 2: Giao diện chính học toán
  return (
    <div className="relative min-h-screen pb-24 overflow-x-hidden font-sans select-none bg-gradient-to-b from-sky-100 via-amber-50/40 to-sky-100/50">
      
      {/* Decors */}
      <div className="absolute top-8 left-8 w-24 h-24 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 right-12 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating balloons render */}
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
          }}
        >
          <div
            style={{
              transform: `scale(${b.scale})`,
              backgroundColor: b.color,
              boxShadow: "inset -12px -12px 24px rgba(0, 0, 0, 0.2), 0 10px 15px rgba(0,0,0,0.1)",
            }}
            className="relative w-16 h-20 rounded-full flex flex-col items-center justify-end"
          >
            <div className="absolute top-full w-0.5 h-20 bg-slate-400/50" />
            <div
              className="w-3.5 h-2.5 rotate-45 -mb-1 relative z-10"
              style={{ backgroundColor: b.color }}
            />
            <div className="absolute top-3 left-4 w-4 h-6 bg-white/30 rounded-full rotate-[15deg]"></div>
          </div>
        </div>
      ))}

      {/* Confetti render */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-particle"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            "--fall-duration": `${c.duration}s`,
          } as React.CSSProperties}
        >
          <div
            style={{
              backgroundColor: c.shape === "triangle" ? "transparent" : c.color,
              width: `${c.size}px`,
              height: `${c.size}px`,
              transform: `rotate(${c.rotation}deg)`,
              borderBottomColor: c.shape === "triangle" ? c.color : undefined,
            }}
            className={`
              ${c.shape === "circle" ? "rounded-full" : ""}
              ${c.shape === "triangle" ? "w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent bg-transparent" : ""}
            `}
          />
        </div>
      ))}

      {/* Header Area */}
      <header className="w-full pt-8 pb-4 px-4 flex flex-col items-center justify-center relative z-20">
        <div className="flex items-center gap-3">
          <span className="text-4xl animate-bounce">🎒</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 tracking-wider filter drop-shadow-sm font-sans text-center">
            BÉ VUI HỌC TOÁN
          </h1>
          <span className="text-4xl animate-bounce" style={{ animationDelay: "0.2s" }}>🖍️</span>
        </div>
        
        {/* Student Status & Options */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {/* Welcome Badge */}
          <div className="px-4 py-2 rounded-full bg-white border-2 border-slate-900 text-slate-800 text-sm font-black shadow-[2px_2px_0px_0px_#1e293b] flex items-center gap-1">
            <span>👋 Chào bé yêu:</span>
            <span className="text-sky-600 underline font-black">{studentName}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playPopSound();
            }}
            className="px-4 py-2 rounded-full bg-white border-2 border-slate-900 text-slate-800 text-sm font-bold shadow-[2px_2px_0px_0px_#1e293b] hover:bg-slate-50 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b] cursor-pointer"
          >
            <span>{soundEnabled ? "🔊 Âm thanh: Bật" : "🔇 Âm thanh: Tắt"}</span>
          </button>

          {/* Logout / Switch Account */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-rose-100 border-2 border-slate-900 text-rose-700 text-sm font-black shadow-[2px_2px_0px_0px_#1e293b] hover:bg-rose-200 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b] flex items-center gap-1 cursor-pointer"
          >
            <span>Thoát tài khoản</span>
            <span>🚪</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 relative z-20 grid grid-cols-1 gap-8">
        
        {/* Settings Control Panel */}
        <section className="w-full bg-amber-100/90 border-3 border-slate-900 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#1e293b] relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full border-3 border-slate-900 flex items-center justify-center font-bold text-2xl animate-spin-slow">
            ☀️
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Setting 1: Operator */}
            <div className="flex flex-col gap-3">
              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="text-emerald-500">➕</span> Chọn Phép Toán:
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOperator("add");
                    playPopSound();
                  }}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl border-3 text-center transition-all cursor-pointer select-none
                    ${
                      operator === "add"
                        ? "bg-emerald-400 border-slate-900 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]"
                        : "bg-white border-slate-900 hover:bg-emerald-50 text-slate-700 shadow-[4px_4px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b]"
                    }
                  `}
                >
                  <span className="text-3xl font-black text-emerald-700 mb-1">➕</span>
                  <span className="text-sm font-bold">Phép Cộng</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOperator("subtract");
                    playPopSound();
                  }}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl border-3 text-center transition-all cursor-pointer select-none
                    ${
                      operator === "subtract"
                        ? "bg-rose-400 border-slate-900 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]"
                        : "bg-white border-slate-900 hover:bg-rose-50 text-slate-700 shadow-[4px_4px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b]"
                    }
                  `}
                >
                  <span className="text-3xl font-black text-rose-700 mb-1">➖</span>
                  <span className="text-sm font-bold">Phép Trừ</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOperator("multiply");
                    playPopSound();
                  }}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl border-3 text-center transition-all cursor-pointer select-none
                    ${
                      operator === "multiply"
                        ? "bg-purple-400 border-slate-900 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]"
                        : "bg-white border-slate-900 hover:bg-purple-50 text-slate-700 shadow-[4px_4px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b]"
                    }
                  `}
                >
                  <span className="text-3xl font-black text-purple-700 mb-1">✖️</span>
                  <span className="text-sm font-bold">Phép Nhân</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOperator("divide");
                    playPopSound();
                  }}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl border-3 text-center transition-all cursor-pointer select-none
                    ${
                      operator === "divide"
                        ? "bg-amber-400 border-slate-900 text-slate-900 shadow-none translate-x-[2px] translate-y-[2px]"
                        : "bg-white border-slate-900 hover:bg-amber-50 text-slate-700 shadow-[4px_4px_0px_0px_#1e293b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b]"
                    }
                  `}
                >
                  <span className="text-3xl font-black text-amber-700 mb-1">➗</span>
                  <span className="text-sm font-bold">Phép Chia</span>
                </button>
              </div>
            </div>

            {/* Setting 2: Range */}
            <div className="flex flex-col gap-3">
              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="text-sky-500">🔢</span> Phạm Vi Số:
              </label>

              <div className="flex flex-col gap-2.5">
                {[
                  { value: "10", label: "Dưới 10 (Lớp 1) 🔟" },
                  { value: "100", label: "Dưới 100 (Lớp 2) 💯" },
                  { value: "1000", label: "Dưới 1000 (Lớp 3) 🔢" },
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setRange(item.value as "10" | "100" | "1000");
                      playPopSound();
                    }}
                    className={`
                      w-full py-2.5 px-4 rounded-xl border-2 text-left font-bold text-sm transition-all flex justify-between items-center cursor-pointer
                      ${
                        range === item.value
                          ? "bg-sky-400 border-slate-900 text-slate-900 translate-x-[1px] translate-y-[1px] shadow-none"
                          : "bg-white border-slate-900 hover:bg-sky-50 text-slate-700 shadow-[3px_3px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_#1e293b]"
                      }
                    `}
                  >
                    <span>{item.label}</span>
                    {range === item.value && <span className="text-sm">🎯</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Setting 3: Count */}
            <div className="flex flex-col gap-3">
              <label className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="text-purple-500">📝</span> Số Lượng Câu Hỏi:
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30, 40, 50, 100].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setCount(num);
                      playPopSound();
                    }}
                    className={`
                      py-2 rounded-xl border-2 text-center font-bold text-sm transition-all cursor-pointer
                      ${
                        count === num
                          ? "bg-purple-400 border-slate-900 text-slate-900 translate-x-[1px] translate-y-[1px] shadow-none"
                          : "bg-white border-slate-900 hover:bg-purple-50 text-slate-700 shadow-[3px_3px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_#1e293b]"
                      }
                    `}
                  >
                    {num} câu
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Action buttons inside the Settings card */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t-2 border-slate-900/10 pt-6">
            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border-3 border-slate-900 bg-amber-400 text-slate-900 font-extrabold text-lg shadow-[4px_4px_0px_0px_#1e293b] hover:bg-amber-300 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{!hasStarted ? "Bắt Đầu Làm Bài" : "Tạo Đề Mới"}</span>
              <span className="text-xl">{!hasStarted ? "🚀" : "🪄"}</span>
            </button>

            <button
              onClick={handleCheckAnswers}
              disabled={questions.length === 0}
              className={`
                w-full sm:w-auto px-8 py-3.5 rounded-2xl border-3 font-extrabold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer
                ${
                  questions.length === 0
                    ? "bg-slate-200 border-slate-400 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-emerald-400 border-slate-900 text-slate-900 shadow-[4px_4px_0px_0px_#1e293b] hover:bg-emerald-300 hover:scale-[1.02] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b]"
                }
              `}
            >
              <span>Check Kết Quả</span>
              <span className="text-xl">🏆</span>
            </button>

            {hasStarted && (
              <button
                onClick={handleResetAnswers}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border-3 border-slate-900 bg-slate-100 text-slate-700 font-extrabold text-md shadow-[4px_4px_0px_0px_#1e293b] hover:bg-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Làm Lại</span>
                <span className="text-md">🔄</span>
              </button>
            )}
          </div>
        </section>

        {/* Questions Grid Section */}
        <section className="w-full">
          {!hasStarted ? (
            <div className="w-full bg-white border-3 border-slate-900 rounded-3xl p-12 text-center shadow-[6px_6px_0px_0px_#1e293b] flex flex-col items-center justify-center gap-6 relative animate-pop">
              <div className="text-8xl animate-bounce-slow">🚀</div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                Chào mừng {studentName} đến với Lớp Học Toán!
              </h2>
              <div className="max-w-lg text-slate-600 font-medium leading-relaxed">
                Bé chỉ cần:
                <ol className="list-decimal list-inside text-left mt-3 space-y-1.5 text-slate-700 font-bold">
                  <li>Chọn phép tính Cộng ➕, Trừ ➖, Nhân ✖️ hoặc Chia ➗</li>
                  <li>Chọn phạm vi số của các câu hỏi 🔢</li>
                  <li>Nhấn nút màu vàng <span className="text-amber-500 font-extrabold">Bắt Đầu Làm Bài 🚀</span> ở phía trên để bắt đầu nhé!</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-pop">
              
              {/* Score banner */}
              {checked && (
                <div className={`w-full p-6 md:p-8 rounded-3xl border-3 border-slate-900 shadow-[6px_6px_0px_0px_#1e293b] flex flex-col md:flex-row items-center gap-6 ${getScoreMessage().color}`}>
                  <div className="text-6xl animate-bounce-slow">
                    {getScoreMessage().emoji}
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h3 className="text-2xl font-black tracking-wide">
                      {getScoreMessage().title}
                    </h3>
                    <p className="font-bold text-sm md:text-base opacity-90">
                      {getScoreMessage().desc}
                    </p>
                    
                    {/* Score Bar Meter */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-bold mb-1 text-slate-700">
                        <span>Điểm số: {score} / {questions.length} câu đúng</span>
                        <span>{Math.round((score / questions.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200/60 rounded-full h-5 border-2 border-slate-900 overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 transition-all duration-1000 ease-out"
                          style={{ width: `${(score / questions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full md:w-auto">
                    <button
                      onClick={handleResetAnswers}
                      className="px-6 py-2.5 rounded-xl border-2 border-slate-900 bg-white text-slate-800 font-extrabold text-sm shadow-[2px_2px_0px_0px_#1e293b] hover:bg-slate-50 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Làm lại bài này</span>
                      <span>🔄</span>
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-6 py-2.5 rounded-xl border-2 border-slate-900 bg-amber-400 text-slate-950 font-extrabold text-sm shadow-[2px_2px_0px_0px_#1e293b] hover:bg-amber-300 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Tạo đề mới</span>
                      <span>🪄</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Notebook Sheet Grid */}
              <div className="w-full bg-white border-3 border-slate-900 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#1e293b] relative">
                
                <div className="w-full border-b-2 border-slate-200 pb-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-red-400 border border-slate-900"></span>
                      <span className="w-4 h-4 rounded-full bg-yellow-400 border border-slate-900"></span>
                      <span className="w-4 h-4 rounded-full bg-green-400 border border-slate-900"></span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-400 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest">
                      Vở bài tập của {studentName} 📖
                    </div>
                  </div>

                  {/* Đồng hồ đếm thời gian */}
                  <div className="flex items-center gap-2">
                    {!checked ? (
                      <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border-2 border-slate-900 rounded-full font-black text-amber-600 text-sm shadow-[2px_2px_0px_0px_#1e293b] animate-pulse">
                        <span className="inline-block animate-bounce-slow">⏱️</span>
                        <span className="font-mono text-base">{formatTimer(timer)}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border-2 border-slate-900 rounded-full font-black text-emerald-700 text-sm shadow-[2px_2px_0px_0px_#1e293b]">
                        <span>⏱️ Làm trong:</span>
                        <span>{formatDuration(timer)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="notebook-bg p-4 md:p-6 rounded-2xl border-2 border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={`
                        relative flex flex-col justify-between p-4 rounded-2xl bg-white border-2 border-slate-200 shadow-sm transition-all duration-300
                        ${q.shake ? "animate-shake border-rose-400 bg-rose-50/20" : ""}
                        ${
                          q.checked
                            ? q.isCorrect
                              ? "border-emerald-400 bg-emerald-50/10"
                              : "border-rose-400 bg-rose-50/10"
                            : "hover:border-slate-400 hover:shadow-md"
                        }
                      `}
                    >
                      {/* Check badge */}
                      {q.checked && (
                        <div className="absolute -top-3.5 -right-2 animate-pop z-10">
                          {q.isCorrect ? (
                            <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-900 bg-emerald-400 shadow-[2px_2px_0px_0px_#1e293b] text-base">
                              ⭐
                            </span>
                          ) : (
                            <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-900 bg-rose-400 shadow-[2px_2px_0px_0px_#1e293b] text-base text-white font-bold">
                              ❌
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mb-3 flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 border border-amber-300 text-amber-800">
                          Câu {idx + 1}
                        </span>
                      </div>

                      {/* Equation: x op y = input */}
                      <div className="flex items-center justify-center gap-2 mb-2 font-mono">
                        <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                          {q.x}
                        </span>

                        <span
                          className={`text-3.5xl font-black select-none ${
                            q.op === "+" ? "text-emerald-500" :
                            q.op === "-" ? "text-rose-500" :
                            q.op === "×" ? "text-purple-500" :
                            "text-amber-500"
                          }`}
                        >
                          {q.op}
                        </span>

                        <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                          {q.y}
                        </span>

                        <span className="text-3xl font-semibold text-slate-400">
                          =
                        </span>

                        <div className="relative">
                          <input
                            id={`input-q-${q.id}`}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={4}
                            value={q.userAnswer}
                            disabled={q.checked}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, q.id)}
                            placeholder="?"
                            className={`
                              w-18 h-14 border-3 rounded-xl text-center text-2xl font-extrabold transition-all outline-none focus:scale-105 font-sans
                              ${
                                q.checked
                                  ? q.isCorrect
                                    ? "bg-emerald-50 border-emerald-500 text-emerald-800 cursor-not-allowed"
                                    : "bg-rose-50 border-rose-500 text-rose-800 cursor-not-allowed"
                                  : "bg-slate-50 border-slate-900 text-slate-800 focus:bg-white focus:border-amber-400 focus:shadow-[0_0_0_4px_rgba(251,191,36,0.3)]"
                              }
                            `}
                          />
                        </div>
                      </div>

                      {/* Error hint */}
                      {q.checked && !q.isCorrect && (
                        <div className="mt-2 text-center py-1 px-2 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 animate-pop">
                          Đáp án đúng: <span className="text-sm font-black">{q.answer}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t-2 border-slate-100 pt-6 gap-4">
                  <div className="text-sm font-bold text-slate-400 text-center md:text-left">
                    💡 Nhấn phím <span className="bg-slate-100 border border-slate-300 px-1.5 py-0.5 rounded text-slate-600 font-mono">Enter</span> để chuyển nhanh câu tiếp theo nhé bé!
                  </div>
                  
                  {!checked ? (
                    <button
                      onClick={handleCheckAnswers}
                      className="px-6 py-2.5 rounded-xl border-2 border-slate-900 bg-emerald-400 text-slate-900 font-black text-sm shadow-[2px_2px_0px_0px_#1e293b] hover:bg-emerald-300 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      Nộp bài & Check Kết Quả 🏆
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleResetAnswers}
                        className="px-5 py-2.5 rounded-xl border-2 border-slate-900 bg-slate-100 text-slate-700 font-extrabold text-sm shadow-[2px_2px_0px_0px_#1e293b] hover:bg-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Làm lại 🔄
                      </button>
                      <button
                        onClick={handleGenerate}
                        className="px-5 py-2.5 rounded-xl border-2 border-slate-900 bg-amber-400 text-slate-950 font-black text-sm shadow-[2px_2px_0px_0px_#1e293b] hover:bg-amber-300 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#1e293b] transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Đề Mới 🪄
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}
        </section>

      </main>

      {/* Detailed Submission Viewer Modal */}
      {selectedHistory && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-60 flex items-center justify-center p-4 animate-pop">
          <div className="bg-white border-3 border-slate-900 rounded-3xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-[8px_8px_0px_0px_rgba(30,41,59,1)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-amber-100 border-b-3 border-slate-900 p-4 md:p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
                  <span>📝</span> Nhật Ký Chi Tiết: {selectedHistory.studentName}
                </h3>
                <p className="text-xs md:text-sm font-bold text-slate-400 mt-1">
                  Thời gian làm bài: {formatDate(selectedHistory.timestamp)}
                </p>
              </div>
              <button
                onClick={() => setSelectedHistory(null)}
                className="w-10 h-10 rounded-xl border-2 border-slate-900 bg-rose-400 text-slate-900 font-bold hover:bg-rose-300 transition-all flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                ❌
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 notebook-bg">
              
              {/* Score overview cards */}
              <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 mb-6 flex flex-wrap gap-4 items-center justify-between font-bold text-sm text-slate-500">
                <div>
                  Phép toán: <span className="text-slate-800 text-base">
                    {selectedHistory.operator === "add" ? "Phép Cộng ➕" :
                     selectedHistory.operator === "subtract" ? "Phép Trừ ➖" :
                     selectedHistory.operator === "multiply" ? "Phép Nhân ✖️" :
                     "Phép Chia ➗"}
                  </span>
                </div>
                <div>
                  Phạm vi số: <span className="text-slate-800 text-base">Dưới {selectedHistory.range}</span>
                </div>
                <div>
                  Kết quả đạt được: <span className="text-slate-800 text-base">{selectedHistory.score} / {selectedHistory.total} câu đúng</span>
                </div>
                {selectedHistory.duration !== undefined && (
                  <div>
                    Làm trong: <span className="text-amber-600 text-base">⏱️ {formatDuration(selectedHistory.duration)}</span>
                  </div>
                )}
                <div className="px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                  Tỉ lệ: {Math.round((selectedHistory.score / selectedHistory.total) * 100)}%
                </div>
              </div>

              {/* Grid of items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {selectedHistory.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className={`
                      relative flex flex-col justify-between p-4 rounded-xl bg-white border-2 shadow-sm
                      ${q.isCorrect ? "border-emerald-400 bg-emerald-50/15" : "border-rose-400 bg-rose-50/15"}
                    `}
                  >
                    <div className="absolute top-2 right-2">
                      {q.isCorrect ? (
                        <span className="text-emerald-500 font-black text-xs bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">⭐ Đúng</span>
                      ) : (
                        <span className="text-rose-500 font-black text-xs bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-full">❌ Sai</span>
                      )}
                    </div>

                    <div className="text-xs font-bold text-slate-400 mb-2">Câu {idx + 1}</div>

                    <div className="flex items-center justify-center gap-1.5 font-mono text-xl font-extrabold mb-1">
                      <span>{q.x}</span>
                      <span className={`
                        ${q.op === "+" ? "text-emerald-500" :
                          q.op === "-" ? "text-rose-500" :
                          q.op === "×" ? "text-purple-500" :
                          "text-amber-500"}
                      `}>{q.op}</span>
                      <span>{q.y}</span>
                      <span className="text-slate-400">=</span>
                      <span
                        className={`
                          px-2 py-0.5 border-2 rounded-lg text-center min-w-10
                          ${q.isCorrect ? "bg-emerald-50 border-emerald-500 text-emerald-800" : "bg-rose-50 border-rose-500 text-rose-800"}
                        `}
                      >
                        {q.userAnswer === "" ? "?" : q.userAnswer}
                      </span>
                    </div>

                    {!q.isCorrect && (
                      <div className="mt-2 text-center py-1 rounded bg-rose-100/80 text-rose-800 text-xs font-bold border border-rose-200">
                        Đáp án đúng: <span className="text-sm font-black">{q.answer}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t-2 border-slate-200 p-4 flex justify-end">
              <button
                onClick={() => setSelectedHistory(null)}
                className="px-6 py-2.5 rounded-xl border-2 border-slate-900 bg-slate-200 text-slate-800 font-black text-sm hover:bg-slate-100 transition-all shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
              >
                Đóng Lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full mt-24 text-center text-xs font-bold text-slate-400/80">
        <p>Bé Luyện Toán Cùng Bé Yêu © 2026. Made with ❤️ for children.</p>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-amber-400 border-3 border-slate-900 rounded-full flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_#1e293b] hover:bg-amber-300 hover:scale-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#1e293b] transition-all cursor-pointer select-none"
          title="Về đầu trang"
        >
          🚀
        </button>
      )}

      {/* Floating Navigation Trigger Tab */}
      {hasStarted && !isNavOpen && (
        <button
          onClick={() => {
            setIsNavOpen(true);
            setIsHistoryOpen(false);
            playPopSound();
          }}
          className="fixed right-0 top-[38%] -translate-y-1/2 z-40 bg-purple-500 border-l-3 border-t-3 border-b-3 border-slate-900 text-slate-950 font-black py-4 px-2.5 rounded-l-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.15)] flex flex-col items-center gap-1.5 cursor-pointer hover:bg-purple-400 transition-all select-none group animate-pop"
        >
          <span className="text-lg group-hover:scale-110 transition-transform">📖</span>
          <span className="text-[10px] uppercase tracking-widest font-black leading-tight flex flex-col items-center">
            {"CÂU HỎI".split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </span>
        </button>
      )}

      {/* Floating History Trigger Tab */}
      {studentName && !isHistoryOpen && (
        <button
          onClick={() => {
            setIsHistoryOpen(true);
            setIsNavOpen(false);
            playPopSound();
          }}
          className={`fixed right-0 -translate-y-1/2 z-40 bg-amber-400 border-l-3 border-t-3 border-b-3 border-slate-900 text-slate-950 font-black py-4 px-2.5 rounded-l-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.15)] flex flex-col items-center gap-1.5 cursor-pointer hover:bg-amber-300 transition-all select-none group animate-pop ${
            hasStarted ? "top-[62%]" : "top-1/2"
          }`}
        >
          <span className="text-lg group-hover:scale-110 transition-transform">🏆</span>
          <span className="text-[10px] uppercase tracking-widest font-black leading-tight flex flex-col items-center">
            {"NHẬT KÝ".split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </span>
        </button>
      )}

      {/* Question Navigation Drawer */}
      {hasStarted && (
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white border-l-3 border-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out p-6 flex flex-col ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-4">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span>🎯</span> Câu Hỏi: {questions.length} câu
            </h3>
            <button
              onClick={() => {
                setIsNavOpen(false);
                playPopSound();
              }}
              className="w-8 h-8 rounded-lg border-2 border-slate-900 bg-rose-400 text-slate-950 font-bold hover:bg-rose-300 transition-all flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              ❌
            </button>
          </div>

          {/* Drawer Info / Legend */}
          <div className="text-[11px] font-bold text-slate-400 space-y-1.5 mb-4 border-b border-slate-200 pb-3">
            {!checked ? (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-sky-100 border border-sky-400"></span>
                  <span>Đã điền đáp án</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-slate-50 border border-slate-200"></span>
                  <span>Chưa làm</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-400 border border-slate-900 flex items-center justify-center text-[8px]">⭐</span>
                  <span>Đúng</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-rose-400 border border-slate-900 flex items-center justify-center text-[8px] text-white">❌</span>
                  <span>Sai</span>
                </div>
              </>
            )}
          </div>

          {/* Questions Grid */}
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                let btnStyles = "";
                
                if (checked) {
                  if (q.isCorrect) {
                    btnStyles = "bg-emerald-400 border-slate-900 text-slate-950 shadow-[2px_2px_0px_0px_#1e293b] font-black";
                  } else {
                    btnStyles = "bg-rose-400 border-slate-900 text-white shadow-[2px_2px_0px_0px_#1e293b] font-black";
                  }
                } else {
                  if (q.userAnswer !== "") {
                    btnStyles = "bg-sky-100 border-sky-400 text-sky-800 hover:bg-sky-200";
                  } else {
                    btnStyles = "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300";
                  }
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      const element = document.getElementById(`input-q-${q.id}`);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                        element.focus();
                        if (element instanceof HTMLInputElement) {
                          element.select();
                        }
                      }
                      if (window.innerWidth < 768) {
                        setIsNavOpen(false);
                      }
                      playPopSound();
                    }}
                    className={`
                      w-10 h-10 rounded-xl border-2 font-black text-sm flex items-center justify-center transition-all cursor-pointer select-none
                      ${btnStyles}
                      active:translate-x-[1px] active:translate-y-[1px] active:shadow-none
                    `}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* History Navigation Drawer */}
      {studentName && (
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md sm:max-w-lg md:max-w-xl bg-white border-l-3 border-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out p-6 flex flex-col ${
            isHistoryOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-4">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <span>📒</span> Bảng Vàng Nhật Ký Học Tập
            </h3>
            <button
              onClick={() => {
                setIsHistoryOpen(false);
                playPopSound();
              }}
              className="w-8 h-8 rounded-lg border-2 border-slate-900 bg-rose-400 text-slate-950 font-bold hover:bg-rose-300 transition-all flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#1e293b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              ❌
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto pr-1">
            {historyList.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                Chưa có dữ liệu bài nộp nào. Bé hãy làm bài và bấm nút Nộp bài để ghi lại nhật ký nhé! 🌟
              </div>
            ) : (
              <div className="space-y-6">
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto border-2 border-slate-900 rounded-2xl bg-white shadow-[4px_4px_0px_0px_#1e293b]">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-amber-100 border-b-2 border-slate-900 font-black text-slate-700 text-xs">
                        <th className="p-3">Học sinh 🧸</th>
                        <th className="p-3">Phép tính ✏️</th>
                        <th className="p-3 text-center">Điểm số 🏆</th>
                        <th className="p-3 text-center">Làm trong ⏱️</th>
                        <th className="p-3 text-center">Hành động 🔍</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-bold text-xs text-slate-600">
                      {paginatedHistory.map((item) => {
                        const ratio = item.score / item.total;
                        let scoreBg = "bg-rose-100 text-rose-800 border-rose-200";
                        if (ratio === 1) scoreBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
                        else if (ratio >= 0.8) scoreBg = "bg-sky-100 text-sky-800 border-sky-300";
                        else if (ratio >= 0.5) scoreBg = "bg-amber-100 text-amber-800 border-amber-300";

                        return (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-3 text-slate-800 font-black">
                              <span>👦</span> {item.studentName}
                            </td>
                            <td className="p-3">
                              <span className="px-1.5 py-0.5 rounded-full border bg-slate-100 text-slate-600 text-[10px] font-bold">
                                {item.operator === "add" ? "Cộng (+)" :
                                 item.operator === "subtract" ? "Trừ (-)" :
                                 item.operator === "multiply" ? "Nhân (×)" :
                                 "Chia (:)"}
                              </span>
                              <div className="mt-1 text-[9px] text-slate-400">
                                Dưới {item.range}
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black ${scoreBg}`}>
                                {item.score}/{item.total}
                              </span>
                            </td>
                            <td className="p-3 text-center text-[10px] font-black text-amber-605">
                              {formatDuration(item.duration)}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  setSelectedHistory(item);
                                  playPopSound();
                                }}
                                className="px-2.5 py-1 rounded-lg border-2 border-slate-900 bg-sky-400 text-slate-900 font-black text-[10px] shadow-[1px_1px_0px_0px_#1e293b] hover:bg-sky-300 transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
                              >
                                Xem 🔍
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/Compact View */}
                <div className="md:hidden flex flex-col gap-4">
                  {paginatedHistory.map((item) => {
                    const ratio = item.score / item.total;
                    let scoreBg = "bg-rose-100 text-rose-800 border-rose-200";
                    if (ratio === 1) scoreBg = "bg-emerald-100 text-emerald-800 border-emerald-300";
                    else if (ratio >= 0.8) scoreBg = "bg-sky-100 text-sky-800 border-sky-300";
                    else if (ratio >= 0.5) scoreBg = "bg-amber-100 text-amber-800 border-amber-300";

                    return (
                      <div
                        key={item.id}
                        className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-[4px_4px_0px_0px_#1e293b] flex flex-col gap-3 relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-855 font-black text-sm flex items-center gap-1">
                            👦 {item.studentName}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            {formatDate(item.timestamp)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 items-center">
                          <span className="px-2 py-0.5 rounded-full border text-[10px] bg-slate-50 text-slate-600 font-bold border-slate-200">
                            {item.operator === "add" ? "Cộng (+)" :
                             item.operator === "subtract" ? "Trừ (-)" :
                             item.operator === "multiply" ? "Nhân (×)" :
                             "Chia (:)"} Dưới {item.range}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-black ${scoreBg}`}>
                            {item.score}/{item.total} đúng
                          </span>
                          <span className="px-2 py-0.5 rounded-full border text-[10px] bg-amber-50 border-amber-200 text-amber-700 font-black flex items-center gap-0.5">
                            ⏱️ {formatDuration(item.duration)}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedHistory(item);
                            playPopSound();
                          }}
                          className="w-full py-2.5 mt-1 rounded-xl border-2 border-slate-900 bg-sky-400 text-slate-950 font-black text-xs shadow-[2px_2px_0px_0px_#1e293b] hover:bg-sky-300 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          Xem Bài Làm 🔍
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Drawer Footer */}
          {historyList.length > 0 && (
            <div className="border-t-2 border-slate-200 pt-4 mt-auto space-y-4 bg-white animate-pop">
              {/* Pagination controls */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span>Hiển thị:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                      playPopSound();
                    }}
                    className="border-2 border-slate-900 bg-white rounded-lg px-2 py-1 font-bold text-slate-800 focus:outline-none cursor-pointer text-xs"
                  >
                    <option value={10}>10 dòng</option>
                    <option value={20}>20 dòng</option>
                    <option value={50}>50 dòng</option>
                  </select>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => {
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                        playPopSound();
                      }}
                      className={`w-7 h-7 rounded-lg border-2 border-slate-900 flex items-center justify-center font-black ${
                        currentPage === 1
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : "bg-white text-slate-900 hover:bg-slate-50 cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                      }`}
                    >
                      ◀
                    </button>
                    <span>
                      Trang {currentPage} / {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => {
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                        playPopSound();
                      }}
                      className={`w-7 h-7 rounded-lg border-2 border-slate-900 flex items-center justify-center font-black ${
                        currentPage === totalPages
                          ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                          : "bg-white text-slate-900 hover:bg-slate-50 cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                      }`}
                    >
                      ▶
                    </button>
                  </div>
                )}
              </div>

              {/* Purge button pinned at bottom */}
              <button
                onClick={handleClearHistory}
                className="w-full py-2.5 rounded-xl border-2 border-slate-900 bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs shadow-[2px_2px_0px_0px_#1e293b] hover:scale-[1.01] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Xóa Tất Cả Nhật Ký</span>
                <span>🗑️</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
