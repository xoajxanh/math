"use client";

import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  characterName: string;
  message: string;
  timestamp: number;
}

export default function ChatWidget({ characterName, isAuthenticated, onOpenChange }: { characterName: string, isAuthenticated: boolean, onOpenChange?: (isOpen: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load initial messages
  useEffect(() => {
    if (!isAuthenticated) return;
    
    let isMounted = true;
    const fetchInitial = async () => {
      try {
        const res = await fetch('/api/mu/chat');
        const data = await res.json();
        if (isMounted) {
          setMessages(data);
          if (data.length < 10) setHasMore(false);
          // Scroll to bottom on initial load
          setTimeout(() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            }
          }, 100);
        }
      } catch (e) {
        console.error("Error loading chat:", e);
      }
    };
    fetchInitial();

    return () => { isMounted = false; };
  }, [isAuthenticated]);

  // Polling for new messages
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      if (messages.length === 0) return;
      
      const lastTimestamp = messages[messages.length - 1]?.timestamp || 0;
      try {
        const res = await fetch(`/api/mu/chat?after=${lastTimestamp}`);
        const newMsgs: ChatMessage[] = await res.json();
        
        if (newMsgs.length > 0) {
          setMessages(prev => {
            // Check if we already have these messages to prevent duplicates
            const existingIds = new Set(prev.map(m => m.id));
            const filteredNew = newMsgs.filter(m => !existingIds.has(m.id));
            
            if (filteredNew.length > 0 && !isOpen) {
              setHasNewMessage(true);
            }

            return [...prev, ...filteredNew];
          });
          
          // Auto scroll down if user is near bottom
          if (isOpen && scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
            if (isNearBottom) {
              setTimeout(() => {
                container.scrollTop = container.scrollHeight;
              }, 50);
            }
          }
        }
      } catch (e) {
        // ignore polling errors
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isAuthenticated, isOpen, messages]);

  const handleScroll = async () => {
    if (!scrollContainerRef.current || isLoadingMore || !hasMore) return;

    if (scrollContainerRef.current.scrollTop === 0 && messages.length > 0) {
      setIsLoadingMore(true);
      const firstTimestamp = messages[0].timestamp;
      
      // Save current scroll height to restore position after loading
      const previousScrollHeight = scrollContainerRef.current.scrollHeight;

      try {
        const res = await fetch(`/api/mu/chat?before=${firstTimestamp}`);
        const olderMsgs: ChatMessage[] = await res.json();
        
        if (olderMsgs.length > 0) {
          setMessages(prev => [...olderMsgs, ...prev]);
          if (olderMsgs.length < 10) setHasMore(false);
          
          // Restore scroll position
          setTimeout(() => {
            if (scrollContainerRef.current) {
              const newScrollHeight = scrollContainerRef.current.scrollHeight;
              scrollContainerRef.current.scrollTop = newScrollHeight - previousScrollHeight;
            }
          }, 0);
        } else {
          setHasMore(false);
        }
      } catch (e) {
        console.error("Error loading older messages:", e);
      } finally {
        setIsLoadingMore(false);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !characterName) return;

    const msgToSend = inputText.trim();
    setInputText(""); // Optimistic clear

    try {
      const res = await fetch('/api/mu/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterName, message: msgToSend })
      });
      
      const newMsg = await res.json();
      setMessages(prev => [...prev, newMsg]);
      
      // Scroll to bottom
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, 50);
    } catch (e) {
      console.error("Error sending message:", e);
    }
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setHasNewMessage(false);
        }}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-blue-600 hover:bg-blue-500 text-white p-3 py-4 rounded-r-xl shadow-[0_0_15px_rgba(37,99,235,0.5)] font-black transition-all ${isOpen ? 'translate-x-[320px]' : 'translate-x-0'}`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '4px' }}
      >
        {isOpen ? '◀' : 'CHAT'}
        {hasNewMessage && !isOpen && (
          <span className="absolute top-2 right-2 flex h-3 w-3" style={{ writingMode: 'horizontal-tb' }}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.8)]"></span>
          </span>
        )}
      </button>

      {/* Chat Panel Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-[320px] bg-slate-800 border-r-2 border-slate-700 shadow-2xl z-40 transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-blue-400 font-black flex items-center gap-2">
            <span>💬</span> Kênh Chat
          </h2>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white font-bold text-xl leading-none">
            &times;
          </button>
        </div>

        {/* Message List */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 custom-scrollbar bg-slate-800/50"
        >
          {isLoadingMore && (
            <div className="text-center text-xs text-slate-500 font-bold py-1">Đang tải...</div>
          )}
          {!hasMore && messages.length > 0 && (
            <div className="text-center text-xs text-slate-500 font-bold py-1 opacity-50">Hết tin nhắn cũ</div>
          )}
          
          {messages.length === 0 && !isLoadingMore && (
            <div className="text-center text-sm text-slate-500 my-auto">Chưa có tin nhắn nào.</div>
          )}

          {messages.map((msg, idx) => {
            const isMe = msg.characterName === characterName;
            const showDate = idx === 0 || new Date(messages[idx - 1].timestamp).getDate() !== new Date(msg.timestamp).getDate();

            return (
              <div key={msg.id} className="flex flex-col gap-1">
                {showDate && (
                  <div className="text-center text-[10px] text-slate-500 font-bold my-2 bg-slate-900/50 rounded-full mx-auto px-3 py-0.5">
                    {formatDate(msg.timestamp)}
                  </div>
                )}
                <div className={`flex flex-col max-w-[85%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                  <span className="text-[10px] text-slate-400 px-1 font-bold flex gap-1.5">
                    {!isMe && <span className="text-amber-400">{msg.characterName}</span>}
                    <span>{formatTime(msg.timestamp)}</span>
                  </span>
                  <div className={`px-3 py-2 rounded-2xl text-sm shadow-sm ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-tr-sm' 
                      : 'bg-slate-700 text-slate-100 rounded-tl-sm border border-slate-600'
                  }`} style={{ wordBreak: 'break-word' }}>
                    {msg.message}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-slate-900 border-t border-slate-700">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              maxLength={200}
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all flex-shrink-0"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
