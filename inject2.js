const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf-8');
const p = content.indexOf('const loadHistoryList =');
const funcs = `
  const loadTimoHistoryList = async () => {
    try {
      const res = await fetch('/api/timo-history');
      if (res.ok) {
        const data = await res.json();
        setTimoHistoryList(data);
      }
    } catch (e) {
      console.error('Lỗi khi tải lịch sử TIMO:', e);
    }
  };

  const handleClearTimoHistory = async () => {
    if (confirm('Bé có chắc muốn xóa toàn bộ nhật ký thi TIMO không?')) {
      try {
        const res = await fetch('/api/timo-history', { method: 'DELETE' });
        if (res.ok) {
          setTimoHistoryList([]);
          playFeedbackSound('correct');
          alert('Đã xóa sạch nhật ký TIMO của bé rồi nhé! 🎈');
        } else {
          alert('Gặp lỗi khi xóa nhật ký.');
        }
      } catch (e) {
        console.error('Lỗi:', e);
      }
    }
  };
`;
content = content.slice(0, p) + funcs + content.slice(p);
fs.writeFileSync('src/app/page.tsx', content);
