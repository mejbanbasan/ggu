import React from 'react';
import { UNIVERSITY_INFO, FACULTIES } from '../data/universityData';
import { Quote, CheckCircle, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HighlightsSection() {
  return (
    <section id="highlights" className="py-20 bg-[#fafafa] relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Executive Dean's Quote Card - Luxury Editorial Design */}
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl mb-20 relative overflow-hidden border border-slate-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-medium uppercase tracking-widest border border-white/15">
                <Quote className="w-3.5 h-3.5 text-[#f5b041]" /> DEAN'S VISION & ACADEMIC MESSAGE
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-snug font-serif italic">
                "Empowering future engineers through academic quality, interdisciplinary innovation, and strong professional ethics."
              </h3>
              
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                Leading a team devoted to quality education, innovative thinking, and holistic student success is a source of great motivation for me. Our Faculty continually evolves to meet the dynamic demands of the engineering profession.
              </p>
              
              <div className="pt-3 flex items-center gap-4 border-t border-slate-800/80">
                <img
                  src="https://gokuluniversity.ac.in/assets/leadership/dabhi_sir.png"
                  alt="Dr. Vipulkumar Dabhi"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#f5b041] bg-slate-800 shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-white font-display">Dr. Vipulkumar Dabhi</h4>
                  <p className="text-xs text-[#f5b041] font-medium">Dean, Faculty of Engineering & Technology, Gokul Global University</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900/90 p-7 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-semibold text-[#f5b041] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#f5b041]" /> Why GGU Engineering?
              </h4>
              <ul className="space-y-3 text-xs text-slate-300 font-sans">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#f5b041] shrink-0" />
                  <span>Industry-Integrated Curriculum</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#f5b041] shrink-0" />
                  <span>AI, Robotics & Drone Incubators</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#f5b041] shrink-0" />
                  <span>Experienced Academic Mentorship</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#f5b041] shrink-0" />
                  <span>15,000+ Alumni Global Network</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Constituent Institutes Section Header */}
        <div id="faculties" className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#800000] inline-block">
            ACADEMIC INSTITUTIONS & FACULTIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            Constituent Colleges at GGU
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACULTIES.map((fac) => (
            <div key={fac.id} className="bg-white border border-slate-100 rounded-2xl p-7 sm:p-8 hover:border-[#800000]/30 hover:shadow-xl transition-all duration-300 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{fac.name}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed font-normal">{fac.description}</p>
              
              {fac.constituents && (
                <div className="mb-5">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2 uppercase tracking-wider">Key Institutes:</span>
                  <div className="flex flex-wrap gap-2">
                    {fac.constituents.map((c, i) => (
                      <span key={i} className="bg-slate-50 text-slate-800 border border-slate-200/60 text-xs px-3 py-1 rounded-full font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-4 border-t border-slate-100">
                {fac.keyFeatures.map((kf, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-[#800000] shrink-0" />
                    <span>{kf}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
