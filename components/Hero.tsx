"use client";
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
// import  AnnouncementPopup  from '@/components/AnnouncementPopup';

const heroImages = [
  '/imports/WhatsApp_Image_2026-04-13_at_12.24.22.jpeg',
  '/imports/DSC_3831.jpg',
  '/imports/DSC_3959.jpg',
  '/imports/10.png',
  '/imports/2.png',
  '/imports/3.png',
  '/imports/Screenshot_2026-04-01_173815.png'
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      

      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex && !isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 animate-ken-burns">
            <ImageWithFallback
              src={image}
              alt={`Kigali Harvest School ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl text-white mb-6 max-w-4xl">
          Strive For The Best Harvest
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl">
          Quality Nursery and Primary Education in Kigali focused on being excellent in providing quality education, culture and christian values for the sustainability of Rwanda's future generations
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-colors"
          >
            Enroll Now 
          </a>
          <a
            href="#contact"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-colors"
          >
            Book a Visit
          </a>
        </div>
      </div>
    </div>
  );
}
