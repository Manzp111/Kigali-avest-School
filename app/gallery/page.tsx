"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar } from "lucide-react";

export default function Hero() {
  const heroImages = [
    "https://ucarecdn.com/61c10189-0166-4456-8bec-492217cf7ef3/-/format/auto/",
    "https://ucarecdn.com/c28c5da8-d05f-49e3-b855-2bdd94416032/-/format/auto/",
    "https://ucarecdn.com/0e60bd79-97c4-4f89-8934-1ddff8a6976c/-/format/auto/",
    "https://ucarecdn.com/a0d758eb-d2d4-4231-94da-1bb55ae1087f/-/format/auto/",
    "https://ucarecdn.com/7a9dbbf7-6508-4c24-b0d2-d1eb5b64e513/-/format/auto/",
    "https://ucarecdn.com/f921b7f1-9718-4c80-bde8-3e91b08e643e/-/format/auto/",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Animated Hero Background Carousel */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 z-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{
            opacity: currentImageIndex === index ? 1 : 0,
            pointerEvents: currentImageIndex === index ? "auto" : "none",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              animation:
                currentImageIndex === index
                  ? "kenBurns 5000ms ease-out forwards"
                  : "none",
            }}
          >
            <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <div className="inline-block bg-[#f59e0b] text-white px-4 py-1 rounded-full font-bold text-sm mb-6 uppercase tracking-wider animate-bounce">
            Admissions Open 2026/27
          </div>
          <h2 className="text-4xl md:text-7xl font-extrabold mb-6 leading-[1.1]">
            Strive For The <br />
            <span className="text-[#fbbf24]">Best Harvest</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 text-blue-50 leading-relaxed font-light">
            Quality Nursery and Primary Education in Kigali focused on providing
            quality education, culture, and Christian values for the
            sustainability of Rwanda's future generations.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#admissions"
              className="bg-[#047857] hover:bg-[#065f46] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center"
            >
              Enroll Now
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#contact"
              className="bg-white hover:bg-gray-100 text-[#1e3a5f] px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center"
            >
              Book a Visit
              <Calendar className="ml-2" size={20} />
            </a>
          </div>

          <div className="mt-12 flex items-center text-blue-100">
            <div className="flex -space-x-3 mr-4">
              {[
                "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&h=100&fit=crop&crop=faces&sat=-100&bri=-20",
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&sat=-100&bri=-20",
                "https://images.unsplash.com/photo-1507114845806-0347f6150324?w=100&h=100&fit=crop&crop=faces",
              ].map((imgUrl, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-blue-900 bg-gray-300 overflow-hidden"
                >
                  <img
                    src={imgUrl}
                    alt="Parent"
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.7) saturate(1.2)" }}
                  />
                </div>
              ))}
            </div>
            <p className="text-sm">
              <span className="font-bold text-[#fbbf24]">500+</span> Parents
              trust us with their children's future
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[60px] fill-white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58,117.26,123.07,124.76,187.52,117.55c65-7.25,129.3-24.22,188.43-41.1Z"></path>
        </svg>
      </div>

      {/* Ken Burns Animation CSS */}
      <style jsx global>{`
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
      `}</style>
    </section>
  );
}