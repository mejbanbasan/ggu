import React from 'react';
import { Quote, Award, Sparkles } from 'lucide-react';

export default function DeanMessageSection() {
  return (
    <section id="dean-message" className="py-24 bg-white relative overflow-hidden border-t-4 border-b-4 border-[#800000]">
      
      {/* Background subtle curve graphic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 100 C 300 200, 500 50, 1540 400" stroke="#cbd5e1" strokeWidth="1" fill="none" />
          <path d="M-100 140 C 320 240, 520 90, 1540 440" stroke="#f5b041" strokeWidth="1" fill="none" opacity="0.4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Circular Portrait (Matching reference screenshot styling) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative group">
              
              {/* Outer Vibrant Ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#800000] via-[#f5b041] to-sky-400 opacity-80 blur-sm group-hover:opacity-100 transition duration-500" />
              
              {/* Image Circle Container with Sky Blue Ring */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[6px] border-sky-400 p-1 bg-white shadow-2xl overflow-hidden flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Dilipkumar S. Patel"
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Badge */}
              <div className="absolute bottom-2 right-2 sm:right-4 bg-[#800000] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#f5b041]" />
                <span>Dean of Engineering</span>
              </div>
            </div>

            <div className="mt-6 space-y-1">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Dr. Dilipkumar S. Patel
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#800000]">
                Dean, Faculty of Engineering & Technology
              </p>
              <p className="text-xs text-slate-500 font-medium">Gokul Global University, Siddhpur</p>
            </div>
          </div>

          {/* Right Column: Text Content matching reference verbatim */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-[#800000] text-xs font-bold uppercase tracking-widest border border-red-100">
                <Quote className="w-3.5 h-3.5 text-[#800000]" /> Academic Leadership Message
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Message from the Dean
              </h2>
              
              <h4 className="text-lg font-bold text-[#800000]">
                Dr. Dilipkumar S. Patel
              </h4>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Leading a team devoted to quality education, innovative thinking, and holistic student success is a source of great satisfaction and motivation for me. Our Faculty continually evolves to meet the dynamic demands of the engineering profession, with a strong focus on quality education, research, and societal relevance.
              </p>
              
              <p>
                At Gokul Global University, we strive to nurture engineers who are not only technically proficient but also ethically grounded and socially responsible — professionals capable of making meaningful contributions at national and global levels. I encourage all our students to embrace challenges, actively engage in research and innovation, and pursue excellence in every endeavor. Together, let us continue to strengthen an academic ecosystem that inspires creativity, fosters collaboration, and upholds the highest standards of engineering education.
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border-l-4 border-[#f5b041] text-slate-800 italic text-sm sm:text-base font-serif leading-relaxed shadow-sm">
                "May these timeless words from the Bhagavad Gita inspire us to work with dedication, integrity, and a higher sense of purpose as we shape the future of engineering education."
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
