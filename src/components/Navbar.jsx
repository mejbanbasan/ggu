import React, { useState } from 'react';
import { Phone, Mail, Award, MapPin, MessageSquare, Mic, Menu, X, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { UNIVERSITY_INFO } from '../data/universityData';

export default function Navbar({ onOpenChatbot, onOpenVoicebot }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* Sleek Top Utility Bar (Refined Maroon #800000) */}
      <div className="bg-[#800000] text-slate-100 text-[11px] py-2 px-6 sm:px-12 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-6 flex-wrap justify-center sm:justify-start text-slate-200">
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3 h-3 text-[#f5b041]" />
              <span>{UNIVERSITY_INFO.contact.phone}</span>
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5 hover:text-white transition">
              <Mail className="w-3 h-3 text-[#f5b041]" />
              <span>{UNIVERSITY_INFO.contact.email}</span>
            </span>
            <span className="hidden md:inline text-white/20">•</span>
            <span className="hidden md:flex items-center gap-1.5 hover:text-white transition">
              <MapPin className="w-3 h-3 text-[#f5b041]" />
              <span>Sidhpur, Gujarat</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold border border-white/15">
              <Award className="w-3 h-3 text-[#f5b041]" /> NAAC Grade A Accredited
            </span>
            <span className="hidden lg:inline text-slate-200/80 font-normal">Govt. Recognized University</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src={logoImg} 
            alt="Gokul Global University Logo" 
            className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Navigation Links - Luxury Serif & Sans Typography */}
        <nav className="hidden lg:flex items-center gap-9 text-xs font-semibold uppercase tracking-wider text-slate-700">
          <a href="#home" className="hover:text-[#800000] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#800000] hover:after:w-full after:transition-all">
            Home
          </a>
          <a href="#programs" className="hover:text-[#800000] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#800000] hover:after:w-full after:transition-all">
            Programs
          </a>
          <a href="#faculties" className="hover:text-[#800000] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#800000] hover:after:w-full after:transition-all">
            Institutes
          </a>
          <a href="#placements" className="hover:text-[#800000] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#800000] hover:after:w-full after:transition-all">
            Placements
          </a>
          <a href="#highlights" className="hover:text-[#800000] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#800000] hover:after:w-full after:transition-all">
            Research & Labs
          </a>
        </nav>

        {/* Minimal Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenChatbot}
            className="flex items-center gap-2 bg-[#800000] hover:bg-[#600000] text-white px-4.5 py-2.5 rounded-full text-xs font-bold transition shadow-sm hover:shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#f5b041]" />
            <span>AI Counselor</span>
          </button>

          <button
            onClick={onOpenVoicebot}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4.5 py-2.5 rounded-full text-xs font-bold transition shadow-sm border border-slate-800 hover:border-slate-700"
          >
            <Mic className="w-3.5 h-3.5 text-[#f5b041]" />
            <span>Voice Assistant</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition border border-slate-200"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 px-6 py-5 flex flex-col gap-3 font-medium text-sm">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 hover:text-[#800000] py-1">Home</a>
          <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 hover:text-[#800000] py-1">Programs & Curriculum</a>
          <a href="#faculties" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 hover:text-[#800000] py-1">Institutes</a>
          <a href="#placements" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 hover:text-[#800000] py-1">Placements</a>
          <a href="#highlights" onClick={() => setMobileMenuOpen(false)} className="text-slate-900 hover:text-[#800000] py-1">Research Labs</a>
          
          <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-100">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenChatbot(); }}
              className="flex items-center justify-center gap-2 bg-[#800000] text-white py-2.5 rounded-full font-bold text-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#f5b041]" /> Student AI Counselor
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenVoicebot(); }}
              className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-full font-bold text-xs"
            >
              <Mic className="w-4 h-4 text-[#f5b041]" /> Voice Assistant
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
