import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, RefreshCw, Cpu } from 'lucide-react';
import { generateGeminiResponse } from '../services/geminiService';
import { marked } from 'marked';

export default function ChatbotModal({ isOpen, onClose, initialQuery = '' }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! Namaste! Main Gokul Global University ke Engineering Department ka Student Counselor hu. Aap kaise hain? Aaj mai aapki kya sahayata kar sakta hu?",
      keyUsed: 1,
      modelUsed: "gemini-3.5-flash"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeEngineInfo, setActiveEngineInfo] = useState({ key: 1, model: "gemini-3.5-flash" });
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSend(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend = null) => {
    const query = textToSend || inputQuery.trim();
    if (!query || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setLoading(true);

    try {
      const response = await generateGeminiResponse(query, messages, false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.text,
        keyUsed: response.keyUsed,
        modelUsed: response.modelUsed
      };
      setMessages(prev => [...prev, botMsg]);
      setActiveEngineInfo({ key: response.keyUsed, model: response.modelUsed });
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Main Gokul Global University ke Engineering Department ka Student Counselor hu. Aap Diploma, B.Tech ya M.Tech ke baare me koi bhi sawaal pooch sakte hain!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-3 sm:right-6 z-50 w-[96vw] sm:w-[540px] md:w-[600px] h-[660px] max-h-[86vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 animate-slideUp transition-all duration-300">
      
      {/* Header (GGU Maroon #800000) */}
      <div className="bg-[#800000] p-4 px-6 text-white flex items-center justify-between border-b border-[#600000] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#f5b041] flex items-center justify-center text-[#800000] shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base flex items-center gap-2 text-white">
              GGU Engineering Counselor
              <span className="bg-[#f5b041] text-[#800000] text-[10px] px-2 py-0.5 rounded font-bold">
                ONLINE
              </span>
            </h3>
            <p className="text-xs text-red-100 flex items-center gap-1 mt-0.5">
              <Cpu className="w-3 h-3 text-[#f5b041]" />
              <span>Counselor Engine: Active</span>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-red-100 hover:text-white hover:bg-white/10 transition"
          title="Close Counselor"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc] text-xs sm:text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-lg bg-[#800000] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-[#f5b041]" />
              </div>
            )}

            <div
              className={`max-w-[94%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed overflow-hidden ${
                msg.sender === 'user'
                  ? 'bg-[#800000] text-white font-medium rounded-tr-none shadow-sm'
                  : 'bg-white text-[#800000] border border-slate-200 shadow-sm rounded-tl-none prose prose-xs sm:prose-sm max-w-none w-full'
              }`}
            >
              {msg.sender === 'bot' ? (
                <div
                  dangerouslySetInnerHTML={{ __html: marked.parse(msg.text || '') }}
                  className="space-y-2"
                />
              ) : (
                <p>{msg.text}</p>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-slate-500 text-xs sm:text-sm">
            <div className="w-8 h-8 rounded-lg bg-[#800000] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-[#f5b041]" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl rounded-tl-none shadow-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#800000]" />
              <span>Counselor is typing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3.5 bg-white border-t border-slate-200 flex items-center gap-3 shrink-0">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask engineering counselor a question..."
          className="flex-1 bg-[#f8fafc] border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#800000] focus:outline-none focus:ring-2 focus:ring-[#800000]"
        />

        <button
          onClick={() => handleSend()}
          disabled={loading || !inputQuery.trim()}
          className="p-2.5 bg-[#800000] hover:bg-[#600000] disabled:opacity-50 text-white rounded-xl transition shadow-sm"
        >
          <Send className="w-4 h-4 text-[#f5b041]" />
        </button>
      </div>

    </div>
  );
}
