import React, { useState } from 'react';
import { Camera, Cpu, BookOpen, Compass, Layers, ShieldCheck, ExternalLink } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    title: "High-Tech Science & Computer Research Labs",
    category: "LABORATORY",
    image: "https://gokuluniversity.ac.in/assets/Lab Photo/sci-microsco-grp.jpg",
    desc: "State-of-the-art workstations and analytical equipment for student experimentation."
  },
  {
    title: "Anchor Institute for AI & Robotics Hub",
    category: "RESEARCH & AI",
    image: "https://gokuluniversity.ac.in/assets/Lab Photo/sci-cube.jpg",
    desc: "Govt. of Gujarat CED recognized center for robotics, automation, and machine learning."
  },
  {
    title: "Advanced Electronics & Electrical Power Labs",
    category: "LABORATORY",
    image: "https://gokuluniversity.ac.in/assets/Lab Photo/004.jpg",
    desc: "Fully equipped circuit design, digital signal processing, and electrical power systems labs."
  },
  {
    title: "Physics & Analytical Testing Laboratories",
    category: "LABORATORY",
    image: "https://gokuluniversity.ac.in/assets/Lab Photo/003.jpg",
    desc: "Modern optics, mechanics, and computational physics laboratory facilities."
  },
  {
    title: "Civil & Mechanical Engineering Workshops",
    category: "WORKSHOPS",
    image: "https://gokuluniversity.ac.in/assets/Lab Photo/006.jpg",
    desc: "Heavy machinery workshops, concrete testing rigs, and CNC manufacturing at HCET."
  },
  {
    title: "Academic MOUs & International Collaborations",
    category: "INNOVATION",
    image: "https://gokuluniversity.ac.in/assets/main-page/mou1.jpeg",
    desc: "Partnership agreements with industrial organizations and global academic institutions."
  },
  {
    title: "NDRF & NSS Student Safety Training Camps",
    category: "CAMPUS LIFE",
    image: "https://gokuluniversity.ac.in/assets/main-page/NDRF.jpg",
    desc: "National Disaster Response Force (NDRF) safety workshops and NCC community drills."
  },
  {
    title: "Gokul Global University Athletics & Sports Complex",
    category: "SPORTS",
    image: "https://gokuluniversity.ac.in/assets/main-page/Sport-2.jpg",
    desc: "Expansive outdoor fields for cricket, football, athletics, and annual university meets."
  }
];

export default function CampusGallerySection() {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const categories = ['ALL', 'LABORATORY', 'RESEARCH & AI', 'CAMPUS LIFE', 'SPORTS'];

  const filteredItems = selectedFilter === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category.includes(selectedFilter));

  return (
    <section className="py-20 bg-white relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#800000] inline-block">
            CAMPUS INFRASTRUCTURE & LIFE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
            A Glimpse into GGU Research & Campus Facilities
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Explore our state-of-the-art laboratories, innovation incubators, drone research facilities, and student life.
          </p>
        </div>

        {/* Minimal Filters */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedFilter === cat
                  ? 'bg-[#800000] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#fafafa] rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-[#f5b041] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#800000] transition-colors mb-1.5 font-display leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1 text-[#800000]">
                    <ShieldCheck className="w-3.5 h-3.5" /> GGU Campus
                  </span>
                  <span>NAAC Grade A</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
