import React from 'react';
import { UNIVERSITY_INFO } from '../data/universityData';
import { Building2, Award, Briefcase, TrendingUp } from 'lucide-react';

// Crisp SVG & Typography Brand Logos matching User Screenshot 2 verbatim
function SchbangLogo() {
  return (
    <div className="flex items-end gap-0.5 font-black tracking-tighter text-slate-950 text-2xl font-sans select-none">
      <span>Schbang</span>
      <span className="w-3.5 h-3.5 bg-amber-400 rounded-sm inline-block mb-1 ml-0.5"></span>
    </div>
  );
}

function OnlyLogo() {
  return (
    <span className="font-black text-2xl tracking-tighter text-black uppercase font-sans select-none">
      ONLY.
    </span>
  );
}

function PantaloonsLogo() {
  return (
    <span className="text-teal-500 font-normal tracking-[0.22em] text-2xl uppercase font-sans select-none">
      PANTALOONS
    </span>
  );
}

function LivspaceLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="42" stroke="#E11D48" strokeWidth="12" />
        <circle cx="50" cy="50" r="26" stroke="#3B82F6" strokeWidth="8" />
      </svg>
      <span className="font-extrabold tracking-widest text-slate-900 text-xl uppercase font-sans">
        LIVSPACE
      </span>
    </div>
  );
}

function TitanLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 7v4c0 5.55 3.84 10.74 8 12 4.16-1.26 8-5.45 8-12V7l-8-5zm0 4.5l5 3.125V11c0 3.65-2.45 7.07-5 8-2.55-.93-5-4.35-5-8V9.625L12 6.5z"/>
      </svg>
      <span className="font-serif font-black tracking-[0.28em] text-slate-950 text-2xl uppercase">
        TITAN
      </span>
    </div>
  );
}

function VeroModaLogo() {
  return (
    <span className="font-serif font-bold tracking-[0.2em] text-slate-950 text-xl uppercase select-none">
      VERO MODA
    </span>
  );
}

function InfosysLogo() {
  return (
    <span className="font-sans font-extrabold tracking-tight text-[#007cc3] text-2xl select-none">
      Infosys
    </span>
  );
}

function WiproLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg className="w-6 h-6" viewBox="0 0 100 100">
        <circle cx="50" cy="20" r="14" fill="#E11D48" />
        <circle cx="80" cy="50" r="14" fill="#2563EB" />
        <circle cx="50" cy="80" r="14" fill="#10B981" />
        <circle cx="20" cy="50" r="14" fill="#F59E0B" />
      </svg>
      <span className="font-sans font-bold text-2xl text-[#0066b2] lowercase tracking-wide">
        wipro
      </span>
    </div>
  );
}

function TcsLogo() {
  return (
    <div className="flex flex-col items-start leading-none select-none">
      <span className="font-sans font-black text-2xl text-slate-950 tracking-tighter">
        TATA
      </span>
      <span className="font-sans text-[9px] font-extrabold text-slate-500 tracking-widest uppercase mt-0.5">
        CONSULTANCY SERVICES
      </span>
    </div>
  );
}

function RelianceLogo() {
  return (
    <span className="font-sans font-black text-2xl text-[#c8102e] tracking-tight uppercase select-none">
      Reliance
    </span>
  );
}

function HdfcLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="w-6 h-6 bg-[#004c8f] flex items-center justify-center text-white font-black text-xs rounded-sm border-2 border-[#e31837]">
        H
      </div>
      <span className="font-sans font-black text-xl text-[#004c8f] tracking-tight">
        HDFC BANK
      </span>
    </div>
  );
}

function SiemensLogo() {
  return (
    <span className="font-sans font-black text-2xl text-[#009999] tracking-[0.25em] uppercase select-none">
      SIEMENS
    </span>
  );
}

function SunPharmaLogo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <svg className="w-5 h-5 text-[#f58220]" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="font-sans font-extrabold text-xl text-[#f58220] tracking-tight">
        SUN PHARMA
      </span>
    </div>
  );
}

const BRAND_LOGOS = [
  { id: 'schbang', component: <SchbangLogo /> },
  { id: 'only', component: <OnlyLogo /> },
  { id: 'pantaloons', component: <PantaloonsLogo /> },
  { id: 'livspace', component: <LivspaceLogo /> },
  { id: 'titan', component: <TitanLogo /> },
  { id: 'veromoda', component: <VeroModaLogo /> },
  { id: 'tcs', component: <TcsLogo /> },
  { id: 'infosys', component: <InfosysLogo /> },
  { id: 'wipro', component: <WiproLogo /> },
  { id: 'reliance', component: <RelianceLogo /> },
  { id: 'hdfc', component: <HdfcLogo /> },
  { id: 'siemens', component: <SiemensLogo /> },
  { id: 'sunpharma', component: <SunPharmaLogo /> },
];

export default function RecruitersSection() {
  // Triple array for seamless infinite marquee loop across full screen width
  const marqueeItems = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section id="placements" className="py-20 bg-white relative border-t-4 border-[#800000] overflow-hidden">
      
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#800000] bg-red-50 px-4 py-1.5 rounded-full border border-red-100 inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#800000]" /> CAREER & RECRUITING PARTNERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Global Placements & Corporate Ties
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed max-w-2xl mx-auto">
            Connecting talented Hansaba Engineering College & GGU graduates with eminent national and multinational corporations.
          </p>
        </div>

        {/* 3 Prominent Stat Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-gradient-to-br from-[#800000] to-[#550000] text-white p-7 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f5b041]">HIGHEST PACKAGE</span>
              <TrendingUp className="w-5 h-5 text-[#f5b041]" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">25+ LPA</h3>
              <p className="text-xs text-red-100 font-medium">Offered in Engineering & Tech roles</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-7 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f5b041]">SUCCESS STORIES</span>
              <Award className="w-5 h-5 text-[#f5b041]" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">15,000+</h3>
              <p className="text-xs text-slate-300 font-medium">Milestone Student Placements</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 p-7 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-950">RECRUITMENT NETWORK</span>
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">1,000+</h3>
              <p className="text-xs text-slate-900 font-bold">Eminent Corporate Recruiters</p>
            </div>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH CONTINUOUS LOGO MARQUEE STRIP (Matching User Screenshot 2 Verbatim) */}
      <div className="w-full relative py-8 bg-white border-y border-slate-200">
        
        <p className="text-center text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-6">
          PROMINENT HIRING PARTNERS & MULTINATIONAL COMPANIES
        </p>

        {/* Fade Out Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* Smooth Infinite Marquee Carousel (ONLY LOGOS, NO BOX CARDS, NO SUBTEXT) */}
        <div className="overflow-hidden py-2">
          <div className="animate-marquee flex items-center gap-14 sm:gap-20 md:gap-24">
            {marqueeItems.map((brand, idx) => (
              <div
                key={idx}
                className="shrink-0 flex items-center justify-center opacity-85 hover:opacity-100 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                {brand.component}
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

