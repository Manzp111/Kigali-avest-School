'use client';

import { ImageWithFallback } from './figma/ImageWithFallback';
import  AnnouncementPopup  from '@/components/AnnouncementPopup';


export function Header() {

   const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 ">
      <AnnouncementPopup/>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between ">
    

  <div className="flex items-center gap-3">
  <div className="w-20 h-23 overflow-hidden flex items-center justify-center">
    <img
      src="/image/logo.jpeg"
      alt="Kigali Harvest School Logo"
      className="w-full h-full object-contain scale-125 px-1"
    />
  </div>

  <div>
    <h2 className="text-blue-900">Kigali Harvest School</h2>
    <p className="text-sm text-gray-600">Excellence in Education</p>
  </div>
</div>

        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-6">
            <button  onClick={() => scrollToSection("about")}  className="text-blue-900 hover:text-green-600 transition-colors">About Us</button>
            <button  onClick={() => scrollToSection("programs")}  className="text-blue-900 hover:text-green-600 transition-colors">Programs</button>
            <button  onClick={() => scrollToSection("gallery")}  className="text-blue-900 hover:text-green-600 transition-colors">Gallery</button>
            <button  onClick={() => scrollToSection("contact")}  className="text-blue-900 hover:text-green-600 transition-colors">Contact</button>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href="tel:+250788510446" className="text-blue-900">+250 788 510 446</a>
          </div>
        </div>
      </div>
    </header>
  );
}
