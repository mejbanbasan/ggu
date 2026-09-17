import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { generateGeminiResponse } from '../services/geminiService';
import { marked } from 'marked';

export default function ChatbotModal({ isOpen, onClose, initialQuery = '' }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! Namaste! Main Gokul Global University ke Engineering Department ka Student Counselor hu. Aap kaise hain? Aaj mai aapki kya sahayata kar sakta hu?"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
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
        text: response.text
      };
      setMessages(prev => [...prev, botMsg]);
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
    <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 z-50 w-full sm:w-[420px] md:w-[460px] h-full sm:h-[620px] sm:max-h-[88vh] flex flex-col overflow-hidden sm:rounded-2xl shadow-2xl animate-slideUp transition-all duration-300"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
      }}
    >
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#800000] to-[#5a0000] p-4 px-5 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-sm flex items-center gap-2 text-white">
              Engineering Counselor
              <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                LIVE
              </span>
            </h3>
            <p className="text-[11px] text-red-200/70 font-medium mt-0.5">
              Gokul Global University
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-red-200 hover:text-white hover:bg-white/10 transition"
          title="Close"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
          >
            {msg.sender === 'bot' && (
              <div className="w-7 h-7 rounded-lg bg-[#800000] flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-amber-300" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#800000] text-white rounded-br-md shadow-sm'
                  : 'bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-100 prose prose-sm max-w-none'
              }`}
            >
              {msg.sender === 'bot' ? (
                <div
                  dangerouslySetInnerHTML={{ __html: marked.parse(msg.text || '') }}
                  className="space-y-1.5 [&>p]:mb-2 [&>ul]:my-1 [&>ol]:my-1"
                />
              ) : (
                <p className="m-0">{msg.text}</p>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 items-start animate-slideUp">
            <div className="w-7 h-7 rounded-lg bg-[#800000] flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#800000] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#800000] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#800000] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2.5 shrink-0">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about courses, fees, admissions..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800000]/20 focus:border-[#800000]/40 transition-all"
        />

        <button
          onClick={() => handleSend()}
          disabled={loading || !inputQuery.trim()}
          className="w-10 h-10 bg-[#800000] hover:bg-[#600000] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
