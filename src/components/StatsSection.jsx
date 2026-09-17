import React from 'react';
import { Award, Briefcase, TrendingUp, Cpu, Compass, Users, Sparkles } from 'lucide-react';
import { UNIVERSITY_INFO } from '../data/universityData';

export default function StatsSection() {
  return (
    <section className="py-16 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Sleek Minimal Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#cf3d3d] inline-block mb-1">
            ACADEMIC DISTINCTION & METRICS
          </span>
          <h2 className="text-3xl sm:text-[34px] font-black text-slate-900 tracking-tight leading-tight">
            Empowering Future Leaders & Innovators
          </h2>
          <p className="text-slate-500 text-sm font-medium max-w-2xl mx-auto pt-1">
            Gokul Global University bridges academic rigor with cutting-edge technology and global career opportunities.
          </p>
        </div>

        {/* Minimal Luxury Metric Strip */}
        <div className="bg-[#fcfcfc] rounded-2xl p-8 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-slate-100/50 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Metric 1 */}
            <div className="flex flex-col items-center text-center pt-4 lg:pt-0 lg:px-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Accreditation</span>
              <div className="flex flex-col leading-none mb-2 text-[#800000]">
                <span className="text-4xl font-black tracking-tighter">NAAC</span>
                <span className="text-[26px] font-black tracking-tight -mt-1">Grade A</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">NAAC Grade A Quality</span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center text-center pt-4 lg:pt-0 lg:px-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Career Placements</span>
              <span className="text-[40px] font-black text-slate-900 tracking-tighter mb-2 leading-none">
                15,000+
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Global Graduates Placed</span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center text-center pt-4 lg:pt-0 lg:px-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Highest Package</span>
              <span className="text-[40px] font-black text-[#800000] tracking-tighter mb-2 leading-none">
                25+ LPA
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Annual Career Offer</span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center text-center pt-4 lg:pt-0 lg:px-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Recruiting Partners</span>
              <span className="text-[40px] font-black text-slate-900 tracking-tighter mb-2 leading-none">
                1,000+
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Eminent MNC Corporates</span>
            </div>
          </div>
        </div>

        {/* Minimal Centers of Excellence Banner */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="bg-white border border-slate-100 p-5 rounded-xl flex items-start gap-4 hover:border-slate-200 hover:shadow-sm transition-all">
            <div className="p-2 bg-slate-50 rounded-lg shrink-0 border border-slate-100">
              <Cpu className="w-5 h-5 text-[#800000]" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-0.5">Anchor Institute for AI & Robotics</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Recognized under Scheme-1 of CED Govt. of Gujarat, establishing a state-of-the-art incubation hub for AI & machine learning.
              </p>
            </div>
          </div>

          <div className="bg-white border border-red-900/10 p-5 rounded-xl flex items-start gap-4 hover:border-red-900/20 hover:shadow-sm transition-all shadow-[0_2px_10px_rgba(128,0,0,0.02)]">
            <div className="p-2 bg-red-50 rounded-lg shrink-0 border border-red-100">
              <Compass className="w-5 h-5 text-[#800000]" />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-0.5">Aero Vision Drone Laboratory</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Specialized Unmanned Aerial Systems (UAS) research center established in strategic partnership with AVPL International.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
