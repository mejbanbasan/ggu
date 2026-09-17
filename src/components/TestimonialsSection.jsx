import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Sanjay Thakor",
    role: "Tacklers",
    country: "India",
    date: "09/30/2025",
    image: "/testimonials/sanjay.png",
    rating: 5,
    quote: "My time at Gokul Global University has been a remarkable chapter in my life. The inclusive atmosphere and diverse student community allowed me to gain new perspectives and memorable experiences."
  },
  {
    name: "Kishor Kumar",
    role: "HDFC Bank Ltd.",
    country: "India",
    date: "10/14/2025",
    image: "/testimonials/kishor.png",
    rating: 5,
    quote: "Being at Gokul Global University was an unforgettable experience that shaped both my academics and personality. The chance to engage with students from different countries enriched my learning journey."
  },
  {
    name: "Milan Prajapati",
    role: "CUB",
    country: "India",
    date: "11/02/2025",
    image: "/testimonials/milan.png",
    rating: 5,
    quote: "Life at Gokul Global University gave me valuable learning opportunities and memories I will always carry. The vibrant campus and global culture helped me connect with international students with ease."
  },
  {
    name: "Nikul kumar",
    role: "Cypress",
    country: "India",
    date: "12/20/2025",
    image: "/testimonials/nikul.png",
    rating: 5,
    quote: "It was wonderful being a part of Gokul Global University, an experience I will always cherish. The University's diverse environment gave me the opportunity to connect with students from different countries and cultures."
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 relative overflow-hidden border-t-4 border-[#800000] border-b border-slate-200">
      
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#cbd5e1_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Giant Watermark Typography in Background */}
        <div className="relative text-center mb-16">
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black text-slate-300/60 uppercase tracking-widest select-none leading-none font-display">
            TESTIMONIALS
          </h2>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What Our Graduates Say
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Hover over cards to view alumni profiles</p>
          </div>
        </div>

        {/* 4 Cards Grid - Plus Width, Crisp White Pop against Slate Background */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden relative group cursor-pointer flex flex-col justify-between min-h-[420px]"
            >
              {/* DEFAULT CARD VIEW (Clean, No top-right 99 icon, No divider line) */}
              <div className="relative z-0 flex flex-col justify-between h-full transition-opacity duration-300 group-hover:opacity-10">
                
                {/* Header: Avatar, Name & Role */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-base text-slate-900 tracking-tight leading-snug truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Quote Content */}
                <div className="my-auto py-2">
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                {/* Footer: 5 Stars + Date (Clean, No divider border line) */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {item.date}
                  </span>
                </div>

              </div>

              {/* HOVERED CARD VIEW (Clean Full Photo Background - No top-right sparkle icon, No center quote icon) */}
              
              {/* Full-bleed Photo Background */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay for Crisp Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 rounded-3xl" />

              {/* Content Over Photo (Hover State) */}
              <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                
                {/* Top Overlay: White Name & Role (Clean, No top-right icon) */}
                <div>
                  <h4 className="font-extrabold text-lg text-white tracking-tight leading-snug drop-shadow-md">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-200 drop-shadow-md">
                    {item.role}
                  </p>
                </div>

                {/* Bottom Overlay: 5 Stars + Country Tag (Clean, No divider line) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-200 font-bold tracking-wide">
                    {item.country} • GGU
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
