import React, { useState, useEffect } from 'react';
import { Phone, Mail, Award, MapPin, Menu, X, ArrowRight, ChevronDown, GraduationCap } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { UNIVERSITY_INFO } from '../data/universityData';

export default function Navbar({ onOpenChatbot, onOpenVoicebot }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#programs', label: 'Programs' },
    { href: '#dean-message', label: 'About' },
    { href: '#highlights', label: 'Research & Labs' },
    { href: '#placements', label: 'Placements' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-lg shadow-sm' 
        : 'bg-white/95 backdrop-blur-md'
    }`}>
      {/* Top Utility Bar */}
      <div className="bg-[#800000] text-slate-200 text-[11px] py-1.5 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-start">
            <a href={`tel:${UNIVERSITY_INFO.contact.phone}`} className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3 h-3 text-[#f5b041]" />
              <span>{UNIVERSITY_INFO.contact.phone}</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href={`mailto:${UNIVERSITY_INFO.contact.email}`} className="flex items-center gap-1.5 hover:text-white transition">
              <Mail className="w-3 h-3 text-[#f5b041]" />
              <span className="hidden sm:inline">{UNIVERSITY_INFO.contact.email}</span>
              <span className="sm:hidden">Email</span>
            </a>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#f5b041]" />
              <span>Sidhpur, Gujarat</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold border border-white/10 text-[10px]">
              <Award className="w-3 h-3 text-[#f5b041]" /> NAAC Grade A
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group shrink-0">
          <img 
            src={logoImg} 
            alt="Gokul Global University Logo" 
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-slate-600">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#800000] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#800000] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Apply for Admission - visible on sm and up */}
          <a
            href="https://gokuluniversity.ac.in/admissions"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#800000] hover:bg-[#600000] text-white px-4 lg:px-5 py-2.5 rounded-xl text-[11px] lg:text-xs font-bold transition-all shadow-sm hover:shadow-md group"
          >
            <GraduationCap className="w-4 h-4 text-[#f5b041]" />
            <span>Apply for Admission</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#f5b041] group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 transition border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-slate-100 px-5 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-[#800000] hover:bg-red-50 py-2.5 px-3 rounded-lg font-medium text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
            {/* Admission CTA mobile */}
            <a
              href="https://gokuluniversity.ac.in/admissions"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#800000] text-white py-3 rounded-xl font-bold text-sm shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GraduationCap className="w-4 h-4 text-[#f5b041]" />
              Apply for Admission
              <ArrowRight className="w-4 h-4 text-[#f5b041]" />
            </a>

            {/* Contact info */}
            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-2">
              <a href={`tel:${UNIVERSITY_INFO.contact.phone}`} className="flex items-center gap-1 hover:text-[#800000]">
                <Phone className="w-3 h-3" /> Call
              </a>
              <a href={`mailto:${UNIVERSITY_INFO.contact.email}`} className="flex items-center gap-1 hover:text-[#800000]">
                <Mail className="w-3 h-3" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
