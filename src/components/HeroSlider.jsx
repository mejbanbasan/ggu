import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mic, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';

const SLIDES = [
  {
    image: "https://gokuluniversity.ac.in/assets/main-page/gr1-banner.jpg",
    tag: "NAAC GRADE 'A' ACCREDITED",
    title: "Inspiring Innovation & Academic Excellence",
    subtitle: "Youngest Private University in Gujarat delivering future-ready technical education in Sidhpur."
  },
  {
    image: "https://gokuluniversity.ac.in/assets/images/Home/about-ggu.jpg",
    tag: "STATE-OF-THE-ART CAMPUS",
    title: "World-Class Infrastructure & Vibrant Community",
    subtitle: "Empowering 15,000+ graduates placed in over 1,000 eminent national and global corporations."
  },
  {
    image: "https://gokuluniversity.ac.in/assets/main-page/gr2-banner.jpg",
    tag: "RESEARCH & AI HUB",
    title: "Anchor Institute for AI, Robotics & Drone Labs",
    subtitle: "Pioneering technological breakthroughs under Govt. of Gujarat CED scheme and AVPL International."
  },
  {
    image: "https://gokuluniversity.ac.in/assets/main-page/NAAC.jpg",
    tag: "ENGINEERING EXCELLENCE",
    title: "Hansaba College of Engineering & Technology",
    subtitle: "Modern smart classrooms, digital libraries, and high-performance computing labs."
  }
];

export default function HeroSlider({ onOpenVoicebot, onOpenChatbot }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div id="home" className="relative w-full h-[540px] sm:h-[620px] overflow-hidden bg-slate-950">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Real High-Res Campus Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
          />

          {/* Minimalist Dark Slate Overlay with subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent" />

          {/* Slide Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full text-white">
              <div className="max-w-2xl space-y-5 animate-slideUp">
                {/* Subtle Luxury Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#f5b041] text-[11px] font-semibold tracking-widest uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f5b041]" />
                  <span>{slide.tag}</span>
                </div>

                {/* Luxury Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-display">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg text-slate-200 font-normal leading-relaxed max-w-xl font-sans">
                  {slide.subtitle}
                </p>

                {/* Minimal Luxury CTAs */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <a
                    href="#programs"
                    className="flex items-center gap-2.5 bg-[#800000] hover:bg-[#600000] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:translate-y-[-1px]"
                  >
                    <span>Explore Programs</span>
                    <ArrowRight className="w-4 h-4 text-[#f5b041]" />
                  </a>

                  <button
                    onClick={onOpenVoicebot}
                    className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-white/25"
                  >
                    <Mic className="w-4 h-4 text-[#f5b041]" />
                    <span>Voice Assistant</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md text-white transition border border-white/15"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-md text-white transition border border-white/15"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Minimal Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentSlide ? 'w-10 bg-[#f5b041]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
