import React, { useState } from 'react';
import { 
  Cpu, Building, Laptop, Wrench, Shield, Zap, 
  Database, Cloud, Globe, Flame, GraduationCap 
} from 'lucide-react';

const PROGRAM_CATEGORIES = {
  "Diploma Programs": [
    { id: "comp-dip", name: "Computer Engineering", icon: Cpu, dept: "Computer & ICT" },
    { id: "ict-dip", name: "Information Technology", icon: Laptop, dept: "Computer & ICT" },
    { id: "civil-dip", name: "Civil Engineering", icon: Building, dept: "Civil" },
    { id: "elec-dip", name: "Electrical Engineering", icon: Zap, dept: "Electrical" },
    { id: "mech-dip", name: "Mechanical Engineering", icon: Wrench, dept: "Mechanical" },
    { id: "auto-dip", name: "Automobile Engineering", icon: Flame, dept: "Mechanical" }
  ],
  "Undergraduate Programs": [
    { id: "cse-ug", name: "Computer Engineering", icon: Cpu, dept: "Computer & ICT" },
    { id: "ai-ug", name: "AI & Data Science", icon: Database, dept: "Computer & ICT" },
    { id: "cyber-ug", name: "Cyber Security & ICT", icon: Shield, dept: "Computer & ICT" },
    { id: "civil-ug", name: "Civil Engineering", icon: Building, dept: "Civil" },
    { id: "elec-ug", name: "Electrical Engineering", icon: Zap, dept: "Electrical" },
    { id: "mech-ug", name: "Mechanical Engineering", icon: Wrench, dept: "Mechanical" }
  ],
  "Postgraduate Programs": [
    { id: "ds-pg", name: "Data Science & AI", icon: Database, dept: "Computer & ICT" },
    { id: "cloud-pg", name: "Cloud Computing", icon: Cloud, dept: "Computer & ICT" },
    { id: "struct-pg", name: "Structural Engineering", icon: Building, dept: "Civil" },
    { id: "trans-pg", name: "Transportation Engg.", icon: Globe, dept: "Civil" },
    { id: "thermal-pg", name: "Thermal Engineering", icon: Flame, dept: "Mechanical" },
    { id: "phd-pg", name: "Ph.D. Engineering", icon: GraduationCap, dept: "Research" }
  ]
};

export default function ProgramsSection({ onAskAboutProgram }) {
  const [activeTab, setActiveTab] = useState("Diploma Programs");

  // Get current active categories for the selected tab
  const categories = PROGRAM_CATEGORIES[activeTab] || PROGRAM_CATEGORIES["Diploma Programs"];

  return (
    <section id="programs" className="py-20 bg-white relative border-b border-slate-100 overflow-hidden">
      
      {/* Full-width Flowing Wavy Contour Background (Spanning seamlessly across the entire section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-75">
        <svg className="w-full h-full min-h-[600px]" preserveAspectRatio="none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Top-Left to Bottom-Right Flowing Curves */}
          <path d="M-100 -50 C 250 80, 400 350, 1540 650" stroke="#e2e8f0" strokeWidth="1.2" fill="none" />
          <path d="M-100 -20 C 280 110, 430 380, 1540 680" stroke="#e2e8f0" strokeWidth="1.2" fill="none" />
          <path d="M-100 10 C 310 140, 460 410, 1540 710" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
          <path d="M-100 40 C 340 170, 490 440, 1540 740" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
          <path d="M-100 70 C 370 200, 520 470, 1540 770" stroke="#f5b041" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M-100 100 C 400 230, 550 500, 1540 800" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M-100 130 C 430 260, 580 530, 1540 830" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M-100 160 C 460 290, 610 560, 1540 860" stroke="#cbd5e1" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M-100 190 C 490 320, 640 590, 1540 890" stroke="#fce7f3" strokeWidth="1.5" fill="none" opacity="0.4" />

          {/* Top-Right Sweeping Arc Waves */}
          <path d="M1540 -80 C 1150 120, 1000 400, 1540 750" stroke="#f5b041" strokeWidth="1.2" fill="none" opacity="0.35" />
          <path d="M1540 -50 C 1180 150, 1030 430, 1540 780" stroke="#cbd5e1" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M1540 -20 C 1210 180, 1060 460, 1540 810" stroke="#cbd5e1" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M1540 10 C 1240 210, 1090 490, 1540 840" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.6" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Main Header tailored for Hansaba Engineering College */}
        <div className="text-center max-w-4xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Hansaba Engineering College — Technical Programs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto font-normal">
            Explore AICTE approved Diploma, B.Tech, M.Tech & Ph.D. engineering programs in Computer Engineering, Artificial Intelligence, Cyber Security, Civil, Electrical, Mechanical & Automobile Engineering.
          </p>
        </div>

        {/* 3 Level Tabs (Exact matching user screenshot styling) */}
        <div className="flex justify-center items-center gap-8 sm:gap-12 mb-10 border-b border-slate-200/80 pb-4">
          {Object.keys(PROGRAM_CATEGORIES).map((tabName) => {
            const isActive = activeTab === tabName;
            return (
              <button
                key={tabName}
                onClick={() => setActiveTab(tabName)}
                className={`relative pb-3 text-sm sm:text-base font-bold transition-all duration-200 ${
                  isActive ? 'text-[#800000]' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {tabName}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#800000] via-[#f5b041] to-[#800000] rounded-full shadow-sm animate-fadeIn" />
                )}
              </button>
            );
          })}
        </div>

        {/* Outer Rounded Container with Light Cyan/Blue Border */}
        <div className="bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* Tiles Grid (Hover-activated Maroon style) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat) => {
              const IconComponent = cat.icon;

              return (
                <div
                  key={cat.id}
                  onClick={() => onAskAboutProgram && onAskAboutProgram(`${cat.name} (${activeTab})`)}
                  className="group rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform bg-[#fff2f4] border border-[#fce4e8] text-slate-900 hover:bg-[#800000] hover:text-white hover:scale-[1.03] hover:shadow-xl hover:border-[#800000]"
                >
                  <div className="p-3.5 rounded-2xl mb-3 flex items-center justify-center bg-red-100/60 text-[#800000] group-hover:bg-white/15 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  
                  <span className="font-bold text-sm sm:text-base leading-snug tracking-tight group-hover:text-white transition-colors duration-300">
                    {cat.name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
