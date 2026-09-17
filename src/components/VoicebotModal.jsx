import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Mic, MicOff, VolumeX, Radio, User, Bot, FileText, ChevronDown } from 'lucide-react';
import { generateGeminiResponse } from '../services/geminiService';

export default function VoicebotModal({ isOpen, onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponseText, setAiResponseText] = useState('');
  const [history, setHistory] = useState([]);
  const [detectedLang, setDetectedLang] = useState('hi-IN');
  const [detailContent, setDetailContent] = useState('');
  const [showDetailPopup, setShowDetailPopup] = useState(false);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const finalTranscriptRef = useRef('');
  const isProcessingRef = useRef(false);
  const voicesLoadedRef = useRef(false);
  const autoModeRef = useRef(true);
  const mountedRef = useRef(true);

  // Keep autoModeRef in sync
  useEffect(() => { autoModeRef.current = autoMode; }, [autoMode]);

  // Track mount state
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  // Eye blink animation
  useEffect(() => {
    const id = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Preload voices (Chrome loads them async)
  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) voicesLoadedRef.current = true;
    };
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  // Detect language from text
  const detectLanguage = useCallback((text) => {
    if (!text) return 'hi-IN';
    // Devanagari script = Hindi
    if (/[\u0900-\u097F]/.test(text)) return 'hi-IN';
    // Gujarati script
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu-IN';
    // Hinglish detection (common Hindi words in Latin script)
    const hinglishWords = /\b(kya|kaise|kahan|kaun|kitna|batao|chahiye|karo|bolo|haan|nahi|accha|theek|acha|padhai|fees|hai|ho|hu|hain|mein|mujhe|kuch|aur|abhi|sab|yeh|woh|bhai|sir|madam|ji|admission|course|semester|branch|engineering)\b/i;
    if (hinglishWords.test(text)) return 'hi-IN';
    // Default English
    return 'en-IN';
  }, []);

  // Get best TTS voice for a language
  const getBestVoice = useCallback((lang) => {
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return null;

    const langPrefix = lang.split('-')[0]; // 'hi', 'en', 'gu'

    // Priority: Google voices > Microsoft voices > any matching voice
    const googleVoice = voices.find(v =>
      v.lang.startsWith(langPrefix) && v.name.toLowerCase().includes('google')
    );
    if (googleVoice) return googleVoice;

    const microsoftVoice = voices.find(v =>
      v.lang.startsWith(langPrefix) && v.name.toLowerCase().includes('microsoft')
    );
    if (microsoftVoice) return microsoftVoice;

    const anyMatch = voices.find(v => v.lang.startsWith(langPrefix));
    if (anyMatch) return anyMatch;

    // Fallback: Hindi > English-IN > first voice
    const hindiVoice = voices.find(v => v.lang.startsWith('hi'));
    if (hindiVoice) return hindiVoice;

    const enInVoice = voices.find(v => v.lang === 'en-IN');
    if (enInVoice) return enInVoice;

    return voices[0];
  }, []);

  // Speak response with proper voice matching
  const speakResponse = useCallback((textToSpeak, lang = 'hi-IN') => {
    if (!synthRef.current || !textToSpeak) return;

    synthRef.current.cancel();

    // Clean markdown/special chars for TTS
    const cleanText = textToSpeak
      .replace(/\|/g, ', ')
      .replace(/[#*_`~\[\]]/g, '')
      .replace(/[-]{2,}/g, ' ')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    // Split long text into chunks (Chrome has a bug with utterances > ~300 chars)
    const maxLen = 250;
    const sentences = cleanText.match(/[^.!?]+[.!?]*/g) || [cleanText];
    const chunks = [];
    let current = '';

    for (const sentence of sentences) {
      if ((current + sentence).length > maxLen && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current += sentence;
      }
    }
    if (current.trim()) chunks.push(current.trim());

    const voice = getBestVoice(lang);

    let chunkIndex = 0;

    const speakChunk = () => {
      if (chunkIndex >= chunks.length || !mountedRef.current) {
        setIsSpeaking(false);
        // Auto-listen after speaking finishes
        if (autoModeRef.current && mountedRef.current) {
          setTimeout(() => {
            if (mountedRef.current && !isProcessingRef.current) {
              startListening();
            }
          }, 700);
        }
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
      if (voice) utterance.voice = voice;
      utterance.lang = lang;
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        chunkIndex++;
        speakChunk();
      };
      utterance.onerror = (e) => {
        console.warn('TTS error:', e.error);
        setIsSpeaking(false);
      };

      synthRef.current.speak(utterance);
    };

    speakChunk();
  }, [getBestVoice]);

  // Parse [DISPLAY] delimiter from AI response
  const parseVoiceResponse = useCallback((fullText) => {
    const marker = '[DISPLAY]';
    const idx = fullText.indexOf(marker);
    if (idx !== -1) {
      const spokenPart = fullText.substring(0, idx).trim();
      const displayPart = fullText.substring(idx + marker.length).trim();
      return { spoken: spokenPart, detail: displayPart };
    }
    // No marker = simple response, speak everything
    return { spoken: fullText.trim(), detail: '' };
  }, []);

  // Handle voice query -> send to Gemini -> speak response
  const handleVoiceQuery = useCallback(async (queryText) => {
    if (!queryText.trim() || isProcessingRef.current) return;

    isProcessingRef.current = true;
    setIsThinking(true);
    setAiResponseText('Soch raha hu...');
    setDetailContent('');

    // Detect language of user's speech
    const lang = detectLanguage(queryText);
    setDetectedLang(lang);

    try {
      const response = await generateGeminiResponse(queryText, history, true);
      const botText = response.text;

      if (!mountedRef.current) return;

      // Parse: spoken part vs display-only part
      const { spoken, detail } = parseVoiceResponse(botText);

      setAiResponseText(spoken);
      if (detail) {
        setDetailContent(detail);
        // Auto-open detail popup when there's detailed info
        setShowDetailPopup(true);
      }

      setHistory(prev => [
        ...prev,
        { sender: 'user', text: queryText },
        { sender: 'bot', text: botText }
      ]);

      // Only speak the SHORT spoken part (not the detail)
      const responseLang = detectLanguage(spoken);
      speakResponse(spoken, responseLang || lang);
    } catch (err) {
      console.error('Gemini voice error:', err);
      const fallback = lang === 'hi-IN'
        ? "Main GGU Engineering ka Counselor hu. Aap engineering courses ya admissions ke baare me pooch sakte hain!"
        : "I am the GGU Engineering Counselor. You can ask me about engineering courses or admissions!";
      setAiResponseText(fallback);
      speakResponse(fallback, lang);
    } finally {
      setIsThinking(false);
      isProcessingRef.current = false;
    }
  }, [history, detectLanguage, speakResponse, parseVoiceResponse]);

  // Create Speech Recognition (only once on mount)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    // Use hi-IN as primary lang — it also recognizes English/Hinglish well
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Aapki awaaz sun raha hu...');
      finalTranscriptRef.current = '';
    };

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }

      // Store final transcript in ref (avoids stale closure)
      if (final) {
        finalTranscriptRef.current = final;
        setTranscript(final);
      } else if (interim) {
        setTranscript(interim);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error !== 'aborted') {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Use ref to get the final transcript (NOT stale state)
      const finalText = finalTranscriptRef.current.trim();
      if (finalText && finalText.length > 1) {
        handleVoiceQuery(finalText);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try { recognition.stop(); } catch (e) { /* ignore */ }
      synthRef.current?.cancel();
    };
  }, [handleVoiceQuery]);

  // Welcome greeting when opened
  useEffect(() => {
    if (isOpen) {
      setHistory([]);
      setTranscript('');
      finalTranscriptRef.current = '';
      isProcessingRef.current = false;

      const welcomeText = "Namaste! Main Gokul Global University ke Engineering Department ka Student Counselor hu. Aap kaise hain? Aaj main aapki kya madad kar sakta hu?";
      setAiResponseText(welcomeText);
      setTimeout(() => {
        if (mountedRef.current) speakResponse(welcomeText, 'hi-IN');
      }, 600);
    } else {
      // Cleanup when closed
      synthRef.current?.cancel();
      try { recognitionRef.current?.stop(); } catch (e) { /* ignore */ }
      setIsListening(false);
      setIsSpeaking(false);
      setIsThinking(false);
    }
  }, [isOpen, speakResponse]);

  const startListening = useCallback(() => {
    if (isSpeaking) {
      synthRef.current?.cancel();
      setIsSpeaking(false);
    }
    setTranscript('');
    finalTranscriptRef.current = '';

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) { /* ignore */ }

      // Small delay to ensure clean restart
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch (err) {
          console.warn('Recognition start error:', err.message);
        }
      }, 150);
    }
  }, [isSpeaking]);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch (e) { /* ignore */ }
    setIsListening(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#800000] w-full max-w-lg rounded-2xl shadow-2xl border border-[#a00000] flex flex-col items-center p-6 text-white relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            synthRef.current?.cancel();
            try { recognitionRef.current?.stop(); } catch (e) { /* ignore */ }
            setIsListening(false);
            setIsSpeaking(false);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#f5b041] text-[#800000] text-xs font-extrabold px-3 py-1 rounded flex items-center gap-1.5 uppercase tracking-wider shadow-sm">
            VOICE STUDENT COUNSELOR
          </span>
        </div>

        {/* Animated Human Counselor Avatar */}
        <div className="relative my-4 flex flex-col items-center">
          
          {/* Avatar Outer Ring */}
          <div className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-300 relative ${
            isSpeaking ? 'bg-[#f5b041] border-4 border-white' :
            isListening ? 'bg-white border-4 border-[#f5b041]' :
            isThinking ? 'bg-slate-700 border-4 border-[#f5b041]' :
            'bg-[#600000] border-2 border-white/20'
          }`}>

            {/* Inner Face Sphere */}
            <div className="w-32 h-32 rounded-full bg-[#800000] flex flex-col items-center justify-center border-2 border-white/30 relative overflow-hidden shadow-inner">
              
              {/* Eyes with Natural Blinking */}
              <div className="flex items-center gap-5 mb-3">
                <div className={`w-3 rounded-full bg-[#f5b041] transition-all duration-150 ${
                  isBlinking ? 'h-0.5' : 'h-3'
                } ${isSpeaking ? 'animate-bounce' : ''}`} />

                <div className={`w-3 rounded-full bg-[#f5b041] transition-all duration-150 ${
                  isBlinking ? 'h-0.5' : 'h-3'
                } ${isSpeaking ? 'animate-bounce' : ''}`} />
              </div>

              {/* Lips / Mouth */}
              <div className={`bg-[#f5b041] rounded-full transition-all duration-200 ${
                isSpeaking ? 'w-8 h-3 animate-pulse' :
                isListening ? 'w-6 h-2 bg-white' : 'w-5 h-1'
              }`} />

              <span className="text-[9px] text-red-100 mt-2.5 font-bold tracking-widest uppercase">
                GGU COUNSELOR
              </span>
            </div>
          </div>

          {/* Status Badge below Avatar */}
          <div className="mt-4 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              isSpeaking ? 'bg-[#f5b041] animate-ping' :
              isListening ? 'bg-white animate-ping' :
              isThinking ? 'bg-slate-300 animate-pulse' : 'bg-slate-400'
            }`} />
            <span className="text-xs font-bold text-slate-100 uppercase tracking-wide">
              {isSpeaking ? 'Counselor Bol Raha Hai...' :
               isListening ? 'Aapki Awaaz Sun Raha Hu...' :
               isThinking ? 'Jawab Soch Raha Hu...' : 'Ready - Mic Dabao'}
            </span>
          </div>

        </div>

        {/* Dialogue Box - Shows spoken text + View Details button */}
        <div className="w-full bg-[#600000] border border-[#a00000] rounded-xl p-4 my-2 min-h-[85px] max-h-[180px] overflow-y-auto">
          {transcript && (
            <p className="text-xs text-[#f5b041] font-semibold mb-2 flex items-center gap-1">
              <User className="w-3.5 h-3.5 shrink-0" /> You: "{transcript}"
            </p>
          )}

          {aiResponseText && (
            <div className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed flex items-start gap-1.5">
              <Bot className="w-4 h-4 text-[#f5b041] shrink-0 mt-0.5" />
              <span className="text-left">{aiResponseText}</span>
            </div>
          )}

          {/* View Details Button - shows when detail popup has content */}
          {detailContent && (
            <button
              onClick={() => setShowDetailPopup(true)}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-[#f5b041] text-[#800000] font-extrabold text-xs py-2.5 rounded-lg hover:bg-[#f7c157] transition shadow-md"
            >
              <FileText className="w-4 h-4" />
              Details Dekho (Screen pe)
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}

          {!transcript && !aiResponseText && (
            <p className="text-xs text-red-100 italic text-center">
              "Mic button dabao aur baat karo counselor se!"
            </p>
          )}
        </div>

        {/* Language Detected Badge */}
        <div className="flex items-center gap-2 my-1">
          <span className="text-[10px] font-bold text-red-200 tracking-wide uppercase">
            Language: {detectedLang === 'hi-IN' ? 'Hindi / Hinglish' : detectedLang === 'gu-IN' ? 'Gujarati' : 'English'}
          </span>
        </div>

        {/* Controls Bar */}
        <div className="w-full pt-4 flex items-center justify-between gap-3 border-t border-white/10 mt-2">
          {/* Toggle Continuous Mode */}
          <button
            onClick={() => setAutoMode(!autoMode)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold transition border ${
              autoMode 
                ? 'bg-[#f5b041] text-[#800000] border-[#f5b041]' 
                : 'bg-white/5 text-slate-300 border-white/10'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Auto: {autoMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Main Microphone Button */}
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isThinking || isSpeaking}
            className={`p-4 rounded-full shadow-md transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening
                ? 'bg-white text-[#800000] animate-pulse'
                : 'bg-[#f5b041] text-[#800000]'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Mute Voice */}
          <button
            onClick={() => {
              synthRef.current?.cancel();
              setIsSpeaking(false);
            }}
            className="p-2.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-bold transition flex items-center gap-1"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>Mute</span>
          </button>
        </div>

      </div>

      {/* ===== DETAIL POPUP MODAL (Syllabus / Fees / Eligibility etc.) ===== */}
      {showDetailPopup && detailContent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            
            {/* Popup Header */}
            <div className="bg-[#800000] px-5 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#f5b041]" />
                <h3 className="text-white font-extrabold text-sm tracking-wide">Detailed Information</h3>
              </div>
              <button
                onClick={() => setShowDetailPopup(false)}
                className="p-1.5 rounded-lg text-red-100 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Popup Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-line font-medium">
                {detailContent}
              </div>
            </div>

            {/* Popup Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <p className="text-[10px] text-slate-400 font-medium">GGU Engineering Counselor</p>
              <button
                onClick={() => setShowDetailPopup(false)}
                className="text-xs font-bold text-[#800000] bg-red-50 border border-red-100 px-4 py-1.5 rounded-lg hover:bg-red-100 transition"
              >
                Band Karo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
