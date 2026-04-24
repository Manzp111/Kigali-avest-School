"use client";

import { useEffect } from "react";
import { X, ZoomIn } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageModal({ src, alt, onClose }: Props) {
  // Handle "Escape" key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
      aria-modal="true"
      role="dialog"
    >
      {/* BACKDROP */}
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md cursor-zoom-out"
        onClick={onClose}
      />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center animate-in zoom-in-95 duration-300 ease-out">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:-right-12 p-2 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
          title="Close (Esc)"
        >
          <X className="w-8 h-8" />
        </button>

        {/* IMAGE */}
        <div className="relative group bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] w-auto object-contain select-none"
          />
          
          {/* BOTTOM CAPTION BAR */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
            <h3 className="text-white font-bold text-lg md:text-xl tracking-tight">
              {alt}
            </h3>
            <div className="flex items-center gap-2 text-blue-300 text-xs mt-1 uppercase font-black tracking-widest">
              <ZoomIn className="w-3 h-3" />
              High Resolution View
            </div>
          </div>
        </div>

        {/* CLICK OUTSIDE HINT */}
        <p className="mt-4 text-white/40 text-sm font-medium hidden md:block">
          Click anywhere outside the image to close
        </p>
      </div>
    </div>
  );
}