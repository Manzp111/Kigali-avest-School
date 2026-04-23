import "./globals.css";
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Programs } from '@/components/Programs';
import { WhyChoose } from '@/components/WhyChoose';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { StickyButtons } from '@/components/StickyButtons';

export default function Home() {
  return (
    <main>
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