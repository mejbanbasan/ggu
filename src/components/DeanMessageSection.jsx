import React from 'react';
import { Quote, Award, GraduationCap, BookOpen } from 'lucide-react';

export default function DeanMessageSection() {
  return (
    <section id="dean-message" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-red-50 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-amber-50 to-transparent rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Tag */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800000]/5 text-[#800000] text-[11px] font-bold uppercase tracking-widest border border-[#800000]/10 mb-5">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Leadership
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Message from the Dean
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left: Dean Photo */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative group">
              
              {/* Glow effect on hover */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#800000]/40 via-[#f5b041]/30 to-sky-400/30 opacity-0 group-hover:opacity-80 blur-xl transition-all duration-700" />
              
              {/* Photo with sky blue ring (matching user's image) */}
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-1.5 bg-gradient-to-tr from-sky-400 via-sky-400 to-sky-300 shadow-xl shadow-sky-200/30">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src="/dean.png"
                    alt="Dr. Dilipkumar S. Patel - Dean, Faculty of Engineering & Technology"
                    className="w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#800000] text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 whitespace-nowrap">
                <Award className="w-3.5 h-3.5 text-[#f5b041]" />
                <span>Dean of Engineering</span>
              </div>
            </div>

            <div className="mt-8 space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Dr. Dilipkumar S. Patel
              </h3>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#800000]">
                Dean, Faculty of Engineering & Technology
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Gokul Global University, Sidhpur</p>
            </div>
          </div>

          {/* Right: Message Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Inspirational Quote */}
            <div className="relative">
              <Quote className="w-8 h-8 text-[#800000]/10 absolute -top-2 -left-1" />
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 leading-relaxed pl-6 sm:pl-8 italic font-serif" style={{ color: '#2d1810' }}>
                "Empowering future engineers through academic quality, interdisciplinary innovation, and strong professional ethics."
              </p>
            </div>

            <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed font-normal">
              <p>
                Leading a team devoted to quality education, innovative thinking, and holistic student success is a source of great satisfaction and motivation for me. Our Faculty continually evolves to meet the dynamic demands of the engineering profession, with a strong focus on quality education, research, and societal relevance.
              </p>
              
              <p>
                At Gokul Global University, we strive to nurture engineers who are not only technically proficient but also ethically grounded and socially responsible — professionals capable of making meaningful contributions at national and global levels. I encourage all our students to embrace challenges, actively engage in research and innovation, and pursue excellence in every endeavor. Together, let us continue to strengthen an academic ecosystem that inspires creativity, fosters collaboration, and upholds the highest standards of engineering education.
              </p>
            </div>

            {/* Bhagavad Gita Quote */}
            <div className="relative p-5 sm:p-6 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%)' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/30 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-[15px] text-amber-900 italic font-serif leading-relaxed">
                  "May these timeless words from the Bhagavad Gita inspire us to work with dedication, integrity, and a higher sense of purpose as we shape the future of engineering education."
                </p>
              </div>
            </div>

            {/* Why GGU Engineering highlight boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Industry-Integrated Curriculum', icon: '📘' },
                { label: 'AI, Robotics & Drone Innovation', icon: '🤖' },
                { label: 'Experienced Academic Mentorship', icon: '👨‍🏫' },
                { label: '15,000+ Alumni Global Network', icon: '🌍' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 px-4 py-3 rounded-xl transition-colors border border-slate-100">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs sm:text-[13px] font-semibold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
