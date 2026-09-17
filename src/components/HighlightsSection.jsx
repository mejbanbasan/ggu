import React from 'react';
import { FACULTIES } from '../data/universityData';
import { ShieldCheck } from 'lucide-react';

export default function HighlightsSection() {
  return (
    <section id="highlights" className="py-16 sm:py-20 bg-[#fafafa] relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

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
