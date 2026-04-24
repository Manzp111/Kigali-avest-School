
import Hero  from '@/components/Hero';
import { About } from '@/components/About';
import { Programs } from '@/components/Programs';
import { WhyChoose } from '@/components/WhyChoose';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { StickyButtons } from '@/components/StickyButtons';
import  AnnouncementPopup  from '@/components/AnnouncementPopup';

export default function Home() {
  return (
    <main>
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