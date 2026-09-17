import React from 'react';
import { Award, BookOpen, ShieldCheck, Sparkles, FileText, Landmark } from 'lucide-react';

export default function ResearchSection() {
  return (
    <section id="research" className="py-24 bg-[#800000] text-white relative overflow-hidden">
      
      {/* Dynamic Flowing White Wave Contour Vector Lines Background (Matching second reference image verbatim) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
        <svg className="w-full h-full min-h-[600px]" preserveAspectRatio="none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 -50 C 300 150, 450 400, 1540 600" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <path d="M-100 -20 C 320 180, 470 430, 1540 630" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <path d="M-100 10 C 340 210, 490 460, 1540 660" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.8" />
          <path d="M-100 40 C 360 240, 510 490, 1540 690" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M-100 70 C 380 270, 530 520, 1540 720" stroke="#f5b041" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M-100 100 C 400 300, 550 550, 1540 750" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M1540 -80 C 1100 150, 950 450, -100 700" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M1540 -50 C 1120 180, 970 480, -100 730" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 text-center">
        
        {/* Accreditation Badges (SIRO, NABL, NABH) */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
          <div className="w-12 h-12 rounded-full bg-white text-[#800000] font-black text-[10px] flex flex-col items-center justify-center border-2 border-[#f5b041] shadow-lg leading-tight">
            <span>SIRO</span>
            <span className="text-[8px] font-semibold text-slate-500">Recognized</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-white text-[#800000] font-black text-[10px] flex flex-col items-center justify-center border-2 border-[#f5b041] shadow-lg leading-tight">
            <span>NABL</span>
            <span className="text-[8px] font-semibold text-slate-500">Accredited</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-white text-[#800000] font-black text-[10px] flex flex-col items-center justify-center border-2 border-[#f5b041] shadow-lg leading-tight">
            <span>NABH</span>
            <span className="text-[8px] font-semibold text-slate-500">Certified</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#f5b041] mb-2">
          Leading The Search For Knowledge
        </p>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight mb-6">
          With Our Facilities For Research & Development
        </h2>

        {/* Highlighted Patent Rank Pill */}
        <div className="inline-block mb-12">
          <div className="bg-[#600000] border border-[#f5b041]/40 text-[#f5b041] px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold shadow-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#f5b041]" />
            <span>Ranked 7th Nationally By Indian Patent Office</span>
          </div>
        </div>

        {/* 3 Main Research Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-[#f5b041] tracking-tight">500+</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wide">Ph.D Research Guides</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-[#f5b041] tracking-tight">25 Cr+</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wide">In Research Grants</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-[#f5b041] tracking-tight">320+</h3>
            <p className="text-xs sm:text-sm font-bold text-slate-100 uppercase tracking-wide">Filled & Published Patents</p>
          </div>
        </div>

      </div>
    </section>
  );
}
