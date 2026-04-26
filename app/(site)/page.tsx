'use client';

import Hero  from '@/components/Hero';
import { About } from '@/components/About';
import { Programs } from '@/components/Programs';
import { WhyChoose } from '@/components/WhyChoose';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { StickyButtons } from '@/components/StickyButtons';
// import  AnnouncementPopup  from '@/components/AnnouncementPopup';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Check if there's a hash in the URL (e.g., /#about)
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Small delay to allow the page to render before scrolling
        setTimeout(() => {
          const headerOffset = 130;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
          
          window.history.pushState(null, "", "/");
        }, 100);
      }
    }
  }, []);
  return (
    <main className="pt-22">
       {/* <AnnouncementPopup /> */}
      <Hero />
      <About />
      <Programs />
      <WhyChoose />
      <Gallery />
      <Testimonials />
      <Contact />
      <StickyButtons />
     
    </main>
  );
}