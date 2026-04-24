"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar } from "lucide-react";

type GalleryImage = {
  id: string;
  imageUrl: string;
  type: string;
  published: boolean;
};

export default function Hero() {
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBackgrounds = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data: GalleryImage[] = await res.json();
        const backgrounds = data
          .filter((img) => img.type === "background" && img.published)
          .map((img) => img.imageUrl);

        setHeroImages(backgrounds.length > 0 ? backgrounds : ["/imports/khs.jpg"]);
      } catch (error) {
        setHeroImages(["/imports/khs.jpg"]);
      } finally {
        setLoading(false);
      }
    };
    loadBackgrounds();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#004795]">
      
      {/* Background Images Layer */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url('${image}')`,
              transform: currentImageIndex === index ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 10s linear'
            }}
          >
            {/* Themed Overlays */}
            <div className="absolute inset-0 bg-[#004795]/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#004795]/95 via-[#004795]/50 to-transparent"></div>
          </div>
        </div>
      ))}

      {/* Content Layer - Controlled by max-w-7xl for perfect Zoom 30%-100% */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pb-24 md:pb-32">
        <div className="max-w-3xl text-white">
          
          <div className="inline-block bg-amber-400 text-[#004795] px-5 py-2 rounded-full font-black text-xs mb-6 uppercase tracking-[0.2em] animate-bounce shadow-xl">
            Admissions Open 2026/27
          </div>
          
          <h2 className="text-5xl md:text-8xl font-black mb-6 leading-[1.1] tracking-tight">
            Strive For The <br />
            <span className="text-[#E31E24]">Best Harvest</span>
          </h2>
          
          <p className="text-lg md:text-2xl mb-10 text-blue-50/90 leading-relaxed max-w-2xl font-medium">
            Quality Nursery and Primary Education in Kigali. We cultivate excellence through Christian values for Rwanda's future generations.
          </p>

          {/* Buttons - Updated to School Logo Colors */}
          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <a href="#admissions" className="bg-[#E31E24] hover:bg-[#b71f1f] text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center group">
              Enroll Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
            </a>
            <a href="#contact" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 px-10 py-5 rounded-2xl font-bold text-xl transition-all transform hover:-translate-y-1 flex items-center justify-center">
              Book a Visit
              <Calendar className="ml-2" size={24} />
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center text-blue-100 bg-black/30 backdrop-blur-md w-fit p-4 rounded-3xl border border-white/10 shadow-2xl">
            <p className="text-xs md:text-sm font-medium flex items-center gap-3">
              <span className="text-3xl font-black text-white font-extrabold ">9000+</span> 
              <span className="opacity-80">Parents trust our <br/> excellence</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58,117.26,123.07,124.76,187.52,117.55c65-7.25,129.3-24.22,188.43-41.1Z"></path>
        </svg>
      </div>
    </section>
  );
}