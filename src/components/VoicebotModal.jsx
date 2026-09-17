import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, Shield } from 'lucide-react';
import { generateGeminiResponse } from '../services/geminiService';
import { queryLocalKnowledge, getWelcomeGreeting } from '../services/localKnowledgeEngine.js';

export default function VoicebotModal({ isOpen, onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const finalTranscriptRef = useRef('');
  const isProcessingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);
  const mountedRef = useRef(true);
  const isMutedRef = useRef(false);
  const isSpeakerMutedRef = useRef(false);
  const isCallTerminatedRef = useRef(false);
  const debounceSpeechTimerRef = useRef(null);
  const historyRef = useRef([]);
  const lastQueryRef = useRef({ text: '', timestamp: 0 });

  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { isSpeakerMutedRef.current = isSpeakerMuted; }, [isSpeakerMuted]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
  useEffect(() => { isListeningRef.current = isListening; }, [isListening]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { 
      mountedRef.current = false;
      isCallTerminatedRef.current = true;
    };
  }, []);

  // Call timer
  useEffect(() => {
    if (!isOpen) {
      setCallSeconds(0);
      setIsCallConnected(false);
      return;
    }
    const timer = setInterval(() => {
      setCallSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatCallDuration = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Soft call connection chime
  const playConnectChime = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext blocked or unsupported
    }
  }, []);

  // Smart natural voice selector prioritizing neural & Indian voices
  const getBestHumanVoice = useCallback((lang = 'hi-IN') => {
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Natural Hindi / Indian voices
    const naturalHindi = voices.find(v => 
      (v.lang.toLowerCase().startsWith('hi')) && 
      (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Swara') || v.name.includes('Madhur') || v.name.includes('Google'))
    );
    if (naturalHindi) return naturalHindi;

    const anyHindi = voices.find(v => v.lang.toLowerCase().startsWith('hi'));
    if (anyHindi) return anyHindi;

    const indianVoice = voices.find(v => v.lang.toLowerCase().includes('in'));
    if (indianVoice) return indianVoice;

    return voices[0];
  }, []);

  // Safe listener starter
  const startListening = useCallback(() => {
    if (isCallTerminatedRef.current || isMutedRef.current || isSpeakingRef.current || isListeningRef.current || !isOpen) return;

    finalTranscriptRef.current = '';
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) {}
      setTimeout(() => {
        try {
          if (!isCallTerminatedRef.current && !isSpeakingRef.current && !isMutedRef.current && mountedRef.current && isOpen) {
            recognitionRef.current.lang = 'hi-IN';
            recognitionRef.current.start();
          }
        } catch (err) {
          // Ignore recognition collision
        }
      }, 40);
    }
  }, [isOpen]);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch (e) {}
    setIsListening(false);
    isListeningRef.current = false;
  }, []);

  // Speech synthesis with human tone & cadence
  const speakResponse = useCallback((textToSpeak, lang = 'hi-IN') => {
    if (isCallTerminatedRef.current || !mountedRef.current || !synthRef.current || !textToSpeak || isSpeakerMutedRef.current) {
      if (!isCallTerminatedRef.current && !isSpeakerMutedRef.current && mountedRef.current) {
        setTimeout(() => startListening(), 400);
      }
      return;
    }

    // Stop recognition immediately while speaking to avoid hearing own echo
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) {}
    }
    setIsListening(false);
    isListeningRef.current = false;

    // Cancel previous speech immediately
    try {
      synthRef.current.cancel();
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch (e) {}

    // Clean text completely: Fix B.Tech pronunciation so TTS does NOT pause between B and Tech
    const cleanText = textToSpeak
      .replace(/b\s*\.\s*tech/gi, 'B-Tech')
      .replace(/m\s*\.\s*tech/gi, 'M-Tech')
      .replace(/ph\s*\.\s*d/gi, 'PhD')
      .replace(/dr\s*\./gi, 'Doctor ')
      .replace(/sem\s*\./gi, 'Semester ')
      .replace(/no\s*\./gi, 'Number ')
      .replace(/%/g, ' percent ')
      .replace(/\+/g, ' plus ')
      .replace(/&/g, ' and ')
      .replace(/\[DISPLAY\][\s\S]*/gi, '')
      .replace(/#{1,6}\s*/g, '')
      .replace(/\*{1,3}/g, '')
      .replace(/_{1,3}/g, '')
      .replace(/`{1,3}/g, '')
      .replace(/\|/g, ', ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[-]{2,}/g, ' ')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .replace(/[~\[\]]/g, '')
      .trim();

    if (!cleanText || isCallTerminatedRef.current) {
      if (mountedRef.current && !isCallTerminatedRef.current) setTimeout(() => startListening(), 400);
      return;
    }

    const sentences = cleanText.match(/[^.!?]+[.!?]*/g) || [cleanText];
    const voice = getBestHumanVoice(lang);
    let index = 0;

    const speakNextSentence = () => {
      if (isCallTerminatedRef.current || !mountedRef.current) {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        return;
      }

      if (index >= sentences.length) {
        setIsSpeaking(false);
        isSpeakingRef.current = false;

        // Automatically open mic to listen to user's reply, just like a phone call!
        // 400ms buffer so mic doesn't catch the tail end of speaker audio
        if (mountedRef.current && !isCallTerminatedRef.current && !isMutedRef.current) {
          setTimeout(() => {
            if (mountedRef.current && !isCallTerminatedRef.current && !isProcessingRef.current && !isSpeakingRef.current) {
              startListening();
            }
          }, 400);
        }
        return;
      }

      const sentence = sentences[index].trim();
      if (!sentence) {
        index++;
        speakNextSentence();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(sentence);
      if (voice) utterance.voice = voice;
      utterance.lang = lang;
      utterance.rate = 1.08; // Brisk and natural
      utterance.pitch = 1.0;
      utterance.volume = 1;

      utterance.onstart = () => {
        if (isCallTerminatedRef.current) {
          try { synthRef.current?.cancel(); } catch (e) {}
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          return;
        }
        setIsSpeaking(true);
        isSpeakingRef.current = true;
      };

      utterance.onend = () => {
        if (isCallTerminatedRef.current || !mountedRef.current) {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          return;
        }
        index++;
        if (synthRef.current?.paused) synthRef.current.resume();
        speakNextSentence();
      };

      utterance.onerror = (e) => {
        // Stop playback completely if cancelled, interrupted, or call terminated
        if (isCallTerminatedRef.current || !mountedRef.current || e.error === 'canceled' || e.error === 'interrupted') {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          return;
        }
        console.warn('SpeechSynthesis error:', e.error);
        index++;
        speakNextSentence();
      };

      try {
        synthRef.current.speak(utterance);
      } catch (e) {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
      }

      // Workaround for Chrome TTS freeze
      setTimeout(() => {
        if (!isCallTerminatedRef.current && synthRef.current?.paused) synthRef.current.resume();
      }, 200);
    };

    setIsSpeaking(true);
    isSpeakingRef.current = true;
    speakNextSentence();
  }, [getBestHumanVoice, startListening]);

  // Handle incoming voice query from user
  const handleVoiceQuery = useCallback(async (queryText) => {
    if (isCallTerminatedRef.current) return;
    const cleanQuery = queryText.trim();
    if (!cleanQuery || isProcessingRef.current) return;

    // Prevent immediate duplicate query execution within 3.5 seconds
    const now = Date.now();
    if (
      cleanQuery.toLowerCase() === lastQueryRef.current.text.toLowerCase() &&
      now - lastQueryRef.current.timestamp < 3500
    ) {
      return;
    }
    lastQueryRef.current = { text: cleanQuery, timestamp: now };

    isProcessingRef.current = true;
    setIsSpeaking(true);
    isSpeakingRef.current = true;

    try {
      const response = await generateGeminiResponse(cleanQuery, historyRef.current, true);
      if (isCallTerminatedRef.current || !mountedRef.current) return;

      let botReply = response.text;
      if (!botReply || botReply.length < 5) {
        botReply = queryLocalKnowledge(cleanQuery, true, 'hi');
      }

      if (isCallTerminatedRef.current || !mountedRef.current) return;

      historyRef.current = [
        ...historyRef.current.slice(-6),
        { sender: 'user', text: cleanQuery },
        { sender: 'bot', text: botReply }
      ];

      speakResponse(botReply, 'hi-IN');
    } catch (err) {
      if (isCallTerminatedRef.current || !mountedRef.current) return;
      console.warn('Gemini query fallback to local knowledge:', err);
      const localReply = queryLocalKnowledge(cleanQuery, true, 'hi');
      speakResponse(localReply, 'hi-IN');
    } finally {
      isProcessingRef.current = false;
    }
  }, [speakResponse]);

  // Setup Speech Recognition
  useEffect(() => {
    if (!isOpen) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true; // Enables instant final detection without delay
    recognition.maxAlternatives = 1;
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
      if (isCallTerminatedRef.current) {
        try { recognition.abort(); } catch (e) {}
        return;
      }
      setIsListening(true);
      isListeningRef.current = true;
      finalTranscriptRef.current = '';
    };

    recognition.onresult = (event) => {
      if (isCallTerminatedRef.current) return;
      let fullTranscript = '';
      let isAnyFinal = false;

      for (let i = 0; i < event.results.length; ++i) {
        if (event.results[i] && event.results[i][0]) {
          fullTranscript += ' ' + event.results[i][0].transcript;
          if (event.results[i].isFinal) isAnyFinal = true;
        }
      }

      const trimmed = fullTranscript.trim();
      if (trimmed) {
        finalTranscriptRef.current = trimmed;
      }

      // If user pauses naturally at end of speech, trigger after 450ms buffer
      // This prevents cutting off sentences like "mere ko BTech AI... [brief pause] ...ke andar admission lena hai"
      if (isAnyFinal && trimmed.length >= 3) {
        if (debounceSpeechTimerRef.current) clearTimeout(debounceSpeechTimerRef.current);
        debounceSpeechTimerRef.current = setTimeout(() => {
          if (!isCallTerminatedRef.current && !isProcessingRef.current && !isSpeakingRef.current) {
            const queryToSend = finalTranscriptRef.current.trim();
            if (queryToSend.length >= 2) {
              finalTranscriptRef.current = '';
              try { recognition.stop(); } catch (e) {}
              handleVoiceQuery(queryToSend);
            }
          }
        }, 450);
      }
    };

    recognition.onerror = (event) => {
      if (debounceSpeechTimerRef.current) clearTimeout(debounceSpeechTimerRef.current);
      if (isCallTerminatedRef.current) return;
      setIsListening(false);
      isListeningRef.current = false;
      if (event.error !== 'aborted') {
        if (mountedRef.current && !isMutedRef.current && !isSpeakingRef.current && !isCallTerminatedRef.current) {
          setTimeout(() => {
            if (mountedRef.current && !isMutedRef.current && !isSpeakingRef.current && !isCallTerminatedRef.current) {
              startListening();
            }
          }, 250);
        }
      }
    };

    recognition.onend = () => {
      if (debounceSpeechTimerRef.current) clearTimeout(debounceSpeechTimerRef.current);
      if (isCallTerminatedRef.current) {
        setIsListening(false);
        isListeningRef.current = false;
        return;
      }
      setIsListening(false);
      isListeningRef.current = false;
      const spokenText = finalTranscriptRef.current.trim();
      finalTranscriptRef.current = '';

      if (spokenText && spokenText.length >= 2 && !isMutedRef.current && !isSpeakingRef.current && !isProcessingRef.current) {
        handleVoiceQuery(spokenText);
      } else {
        // Keep listening if call is active
        if (mountedRef.current && !isMutedRef.current && !isSpeakingRef.current && !isCallTerminatedRef.current) {
          setTimeout(() => {
            if (mountedRef.current && !isMutedRef.current && !isSpeakingRef.current && !isCallTerminatedRef.current) {
              startListening();
            }
          }, 150);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.onstart = null;
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.stop();
      } catch (e) {}
      try {
        synthRef.current?.cancel();
      } catch (e) {}
    };
  }, [isOpen, handleVoiceQuery, startListening]);

  // Watchdog Timer: Ensures listening is active when call is idle
  useEffect(() => {
    if (!isOpen) return;

    const watchdogInterval = setInterval(() => {
      if (
        isOpen &&
        !isCallTerminatedRef.current &&
        mountedRef.current &&
        !isMutedRef.current &&
        !isSpeakingRef.current &&
        !isProcessingRef.current &&
        !isListeningRef.current
      ) {
        startListening();
      }
    }, 1200);

    return () => clearInterval(watchdogInterval);
  }, [isOpen, startListening]);

  // Initial call connection & greeting
  useEffect(() => {
    if (isOpen) {
      isCallTerminatedRef.current = false;
      historyRef.current = [];
      finalTranscriptRef.current = '';
      isProcessingRef.current = false;
      setIsMuted(false);
      setIsSpeakerMuted(false);

      playConnectChime();

      const timer = setTimeout(() => {
        if (!mountedRef.current || isCallTerminatedRef.current) return;
        setIsCallConnected(true);

        const welcomeSpeech = getWelcomeGreeting('hi');
        speakResponse(welcomeSpeech, 'hi-IN');
      }, 400);

      return () => clearTimeout(timer);
    } else {
      isCallTerminatedRef.current = true;
      try {
        synthRef.current?.cancel();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      } catch (e) {}
      if (recognitionRef.current) {
        try {
          recognitionRef.current.onstart = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.abort();
        } catch (e) {}
      }
      setIsListening(false);
      isListeningRef.current = false;
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setIsCallConnected(false);
    }
  }, [isOpen, speakResponse, playConnectChime]);

  // Instant Hang up & close - 100% silence guaranteed
  const handleEndCall = useCallback(() => {
    isCallTerminatedRef.current = true;

    // Immediately cancel and clear browser speech synthesis queue
    try {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {}

    // Detach all speech recognition event listeners
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch (e) {}
    }

    if (debounceSpeechTimerRef.current) clearTimeout(debounceSpeechTimerRef.current);
    finalTranscriptRef.current = '';
    isProcessingRef.current = false;
    isSpeakingRef.current = false;
    isListeningRef.current = false;
    setIsListening(false);
    setIsSpeaking(false);
    setIsCallConnected(false);

    onClose();
  }, [onClose]);

  // Toggle Mute
  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (!isSpeaking) startListening();
    } else {
      setIsMuted(true);
      stopListening();
    }
  };

  // Toggle Speaker
  const handleToggleSpeaker = () => {
    if (isSpeakerMuted) {
      setIsSpeakerMuted(false);
    } else {
      try {
        synthRef.current?.cancel();
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      } catch (e) {}
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setIsSpeakerMuted(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Call Screen Window */}
      <div 
        className="relative w-full h-full sm:h-auto sm:max-w-sm sm:min-h-[620px] sm:rounded-[36px] overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10"
        style={{
          background: 'radial-gradient(circle at 50% 15%, #2a0808 0%, #120404 45%, #08080c 100%)',
        }}
      >
        {/* Background ambient decorative rings */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Bar: Call Info & Security */}
        <div className="relative z-10 px-6 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium text-slate-300 tracking-wide">HD Voice Call</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wider">
              {formatCallDuration(callSeconds)}
            </span>
          </div>
        </div>

        {/* Center: Caller Identity & Status */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-6">
          
          {/* Caller Avatar with Animated Pulsing Rings */}
          <div className="relative mb-6 flex items-center justify-center">
            {(isSpeaking || isListening) && (
              <>
                <div 
                  className={`absolute w-44 h-44 rounded-full border ${
                    isSpeaking ? 'border-amber-500/25' : 'border-emerald-500/25'
                  } animate-ping`} 
                  style={{ animationDuration: '2s' }} 
                />
                <div 
                  className={`absolute w-56 h-56 rounded-full border ${
                    isSpeaking ? 'border-amber-500/10' : 'border-emerald-500/10'
                  } animate-ping`} 
                  style={{ animationDuration: '2.8s' }} 
                />
              </>
            )}

            {/* Glowing Backdrop Circle */}
            <div 
              className={`w-32 h-32 sm:w-34 sm:h-34 rounded-full p-1.5 flex items-center justify-center transition-all duration-700 shadow-2xl ${
                isSpeaking 
                  ? 'bg-gradient-to-tr from-amber-500/40 via-red-600/40 to-amber-400/40 shadow-[0_0_50px_rgba(245,176,65,0.35)]' 
                  : isListening 
                  ? 'bg-gradient-to-tr from-emerald-500/40 via-teal-600/40 to-emerald-400/40 shadow-[0_0_50px_rgba(52,211,153,0.35)]' 
                  : 'bg-white/10 shadow-black/50'
              }`}
            >
              {/* Inner Avatar Ring */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#800000] via-[#550000] to-[#2b0000] flex flex-col items-center justify-center border border-amber-400/30 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-1 shadow-inner">
                  <span className="text-xl font-black text-amber-400 font-display tracking-wider">GGU</span>
                </div>
                <p className="text-[10px] font-semibold text-amber-200/90 tracking-wider uppercase">Counselor</p>
              </div>
            </div>
          </div>

          {/* Caller Details */}
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
              GGU Admissions Counselor
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Hansaba College of Engineering & Technology
            </p>
            <p className="text-[11px] text-amber-400/80 font-medium">
              Gokul Global University &bull; Sidhpur, Gujarat
            </p>
          </div>

          {/* Status Badge: Speaking... or Listening... */}
          <div className="flex items-center justify-center mb-5">
            {isSpeaking ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-lg shadow-amber-500/10 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Speaking...</span>
              </div>
            ) : isListening ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg shadow-emerald-500/10 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Listening...</span>
              </div>
            ) : isMuted ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold">
                <MicOff className="w-3.5 h-3.5 text-red-400" />
                <span>Muted</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Listening...</span>
              </div>
            )}
          </div>

          {/* Dynamic Sound Equalizer Waveform */}
          <div className="flex items-center justify-center gap-1.5 h-10 w-48 px-2 py-1">
            {[4, 8, 14, 22, 28, 18, 12, 26, 32, 24, 16, 28, 20, 10, 6].map((baseHeight, i) => {
              const active = isSpeaking || isListening;
              const barColor = isSpeaking 
                ? 'bg-amber-400/90 shadow-[0_0_8px_rgba(245,176,65,0.6)]' 
                : isListening 
                ? 'bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.6)]' 
                : 'bg-white/20';

              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${barColor}`}
                  style={{
                    height: active ? `${Math.max(6, baseHeight * (isSpeaking ? 1 : 0.7))}px` : '4px',
                    animation: active ? `soundWave ${0.5 + (i % 4) * 0.15}s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              );
            })}
          </div>

        </div>

        {/* Bottom Bar: True Phone Call Controls */}
        <div className="relative z-10 px-8 pb-9 pt-3 flex flex-col items-center gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="w-full flex items-center justify-around max-w-xs">
            {/* 1. Mute / Unmute Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={handleToggleMute}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                  isMuted 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <span className="text-[11px] font-medium text-slate-400">
                {isMuted ? 'Unmute' : 'Mute'}
              </span>
            </div>

            {/* 2. End Call Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={handleEndCall}
                className="w-18 h-18 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white flex items-center justify-center shadow-xl shadow-red-600/40 active:scale-95 transition-all duration-200"
                title="End Call"
                style={{ width: '4.5rem', height: '4.5rem' }}
              >
                <PhoneOff className="w-7 h-7" />
              </button>
              <span className="text-[11px] font-semibold text-rose-300">
                End Call
              </span>
            </div>

            {/* 3. Speaker Button */}
            <div className="flex flex-col items-center gap-1.5">
              <button
                onClick={handleToggleSpeaker}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
                  isSpeakerMuted 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                }`}
                title={isSpeakerMuted ? 'Unmute speaker' : 'Mute speaker'}
              >
                {isSpeakerMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <span className="text-[11px] font-medium text-slate-400">
                {isSpeakerMuted ? 'Muted' : 'Speaker'}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 font-medium tracking-wide">
            Toll-Free Admissions Helpline &bull; Sidhpur, Gujarat
          </p>
        </div>

      </div>
    </div>
  );
}
