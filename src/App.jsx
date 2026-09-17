import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import StatsSection from './components/StatsSection';
import ProgramsSection from './components/ProgramsSection';
import DeanMessageSection from './components/DeanMessageSection';
import HighlightsSection from './components/HighlightsSection';
import ResearchSection from './components/ResearchSection';
import TestimonialsSection from './components/TestimonialsSection';
import RecruitersSection from './components/RecruitersSection';
import ChatbotModal from './components/ChatbotModal';
import VoicebotModal from './components/VoicebotModal';
import { MessageSquare, Mic, MapPin, Phone, Mail, Award } from 'lucide-react';
import { UNIVERSITY_INFO } from './data/universityData';

export default function App() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [voicebotOpen, setVoicebotOpen] = useState(false);
  const [presetQuery, setPresetQuery] = useState('');

  const handleAskProgram = (programTitle) => {
    setPresetQuery(`Tell me complete curriculum details, fees, and eligibility for ${programTitle}.`);
    setChatbotOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-[#f5b041] selection:text-[#800000] flex flex-col justify-between">
      
      {/* Header / Navbar */}
      <Navbar
        onOpenChatbot={() => { setPresetQuery(''); setChatbotOpen(true); }}
        onOpenVoicebot={() => setVoicebotOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Slider with Real High-Res Photos */}
        <HeroSlider
          onOpenVoicebot={() => setVoicebotOpen(true)}
          onOpenChatbot={() => { setPresetQuery(''); setChatbotOpen(true); }}
        />

        {/* Key Statistics & Accreditations */}
        <StatsSection />

        {/* Programs & Curriculum Explorer */}
        <ProgramsSection onAskAboutProgram={handleAskProgram} />

        {/* Official Message from the Dean */}
        <DeanMessageSection />

        {/* Research Labs & Faculty Overview */}
        <HighlightsSection />

        {/* R&D Facilities & Patent Excellence Section */}
        <ResearchSection />

        {/* Student & Alumni Testimonials */}
        <TestimonialsSection />

        {/* Placement Recruiters */}
        <RecruitersSection />
      </main>

      {/* Footer (Clean Luxury Dark Slate #090d16) */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-3.5 max-w-sm">
            <h4 className="text-white font-bold text-base font-display">{UNIVERSITY_INFO.name}</h4>
            <p className="text-slate-400 leading-relaxed font-light">
              NAAC Grade A Accredited University delivering excellence in engineering, artificial intelligence, robotics, and holistic technical education.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#f5b041] text-[11px] font-semibold">
              <Award className="w-3.5 h-3.5 text-[#f5b041]" /> NAAC Grade A Accredited
            </div>
          </div>

          <div className="space-y-3 md:text-right">
            <h5 className="text-white font-semibold text-xs uppercase tracking-wider font-display">Campus Contact</h5>
            <p className="flex items-center md:justify-end gap-2 text-slate-400"><MapPin className="w-3.5 h-3.5 text-[#f5b041]" /> {UNIVERSITY_INFO.address}</p>
            <p className="flex items-center md:justify-end gap-2 text-slate-400"><Phone className="w-3.5 h-3.5 text-[#f5b041]" /> {UNIVERSITY_INFO.contact.phone}</p>
            <p className="flex items-center md:justify-end gap-2 text-slate-400"><Mail className="w-3.5 h-3.5 text-[#f5b041]" /> {UNIVERSITY_INFO.contact.email}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-light">
          <p>© 2026 Gokul Global University (GGU). All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Gokul Global University • Sidhpur, Gujarat
          </p>
        </div>
      </footer>

      {/* Floating Action Buttons (Bottom-Right) - Minimal Redesign */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Voicebot Button */}
        <button
          onClick={() => setVoicebotOpen(true)}
          className="flex items-center justify-center w-12 h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg transition-transform duration-200 hover:scale-110 group relative"
        >
          <Mic className="w-5 h-5 text-[#f5b041]" />
          <span className="absolute right-14 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Voice Assistant
          </span>
        </button>

        {/* Chatbot Button */}
        <button
          onClick={() => { setPresetQuery(''); setChatbotOpen(true); }}
          className="flex items-center justify-center w-14 h-14 bg-[#800000] hover:bg-[#600000] text-white rounded-full shadow-[0_4px_20px_rgba(128,0,0,0.3)] transition-transform duration-200 hover:scale-110 group relative"
        >
          <MessageSquare className="w-6 h-6 text-[#f5b041]" />
          <span className="absolute right-16 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            AI Counselor
          </span>
        </button>
      </div>

      {/* Modals */}
      <ChatbotModal
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        initialQuery={presetQuery}
      />

      <VoicebotModal
        isOpen={voicebotOpen}
        onClose={() => setVoicebotOpen(false)}
      />

    </div>
  );
}
