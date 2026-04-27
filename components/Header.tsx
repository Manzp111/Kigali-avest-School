'use client';

import AnnouncementPopup from '@/components/AnnouncementPopup';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

 const scrollToSection = (id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 130; // 80px (header) + 50px (announcement)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      window.history.pushState(null, "", "/");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-xl pb-[9px]">
      <AnnouncementPopup />
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-20">        
        
        {/* LOGO & BRANDING - Wrapped in Link for better navigation */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-16 h-16 flex items-center justify-center overflow-hidden">
            <img
              src="/image/logo.jpeg"
              alt="Kigali Harvest School Logo"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-[#004795] font-black text-xl tracking-tighter leading-none">
              KIGALI HARVEST SCHOOL
            </h2>
            <p className="text-[15px] text-[#D62828] font-bold  tracking-widest mt-1">
              Excellence in Education
            </p>
          </div>
        </Link>

        {/* NAVIGATION & CONTACT */}
        <div className="flex items-center gap-10">
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'About Us', id: 'about' },
              { label: 'Programs', id: 'programs' },
              { label: 'Gallery', id: 'gallery' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="text-slate-600 font-bold text-sm hover:text-[#004795] transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E31E24] transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 px-5 py-2.5 rounded-2xl group hover:bg-[#004795] transition-all duration-300 border border-slate-100">
            <svg className="w-5 h-5 text-[#004795] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href="tel:+250788510446" className="text-[#004795] font-black text-sm group-hover:text-white transition-colors">
              +250 788 510 446
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}