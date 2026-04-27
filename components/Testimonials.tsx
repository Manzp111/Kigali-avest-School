"use client";

import { Quote } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'NZEYIMANA Francois Xavier',
    image: '/imports/Screenshot_2026-04-16_110117.png',
    grade: 'Parent of Middle Class Nursery Student',
    text: 'We are proud to entrust our children to this Christian school, where they are nurtured in both academic excellence and strong social values. Through diverse club activities, students grow in knowledge, character, and confidence in engaging with others.'
  },
  {
    name: 'MUTESI Adrienne',
    image: '/imports/Screenshot_2026-04-16_104329.png',
    grade: 'Parent of Grade 2 and Grade 5 Students',
    text: 'As a ministry of Restoration Church, this school instills the Word of God while nurturing children through music, drama, and quality education. It builds strong values, good character, and language excellence—my children now speak English fluently both at school and at home.'
  },
  {
    name: 'KABERA Marcel',
    image: '/imports/Screenshot_2026-04-16_104736.png',
    grade: 'Parent of Upper Class Nursery Student',
    text: 'This school provides excellent teaching and academic results, elping children achieve distinction and success in their studies. Through weekly Friday sermons and prayer gatherings, students develop strong values, discipline and admirable behavior, which is why I confidently encourage other parents to enroll their children here.'
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section - Blue & Black Only */}
        <div className="text-center mb-16">
          <h2 className="text-4xl text-blue-900 mb-4 font-bold tracking-tight">
            What Our Parents Say
          </h2>
          {/* Blue Divider (Black could be used here too if preferred) */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-20 h-2 bg-[#004795] rounded-full"></div>
            <div className="w-8 h-2 bg-[#004795] rounded-full opacity-50"></div>
          </div>
          <p className="text-xl text-black/80 font-medium max-w-2xl mx-auto">
            Hear from our trusted community of parents
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-[#e0f0ff] rounded-[2.5rem] p-8 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
            >
              {/* Quote Icon Accent - Now Solid Blue */}
              <div className="absolute -top-4 -right-4 bg-[#004795] p-3 rounded-2xl shadow-lg transform group-hover:rotate-12 transition-transform">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Avatar Section - Rounded-Square, Not Circle */}
              <div className="flex items-center gap-5 mb-8 pb-6 border-b border-white/30">
                <div className="relative p-1 bg-white rounded-3xl shadow-md">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-2xl object-cover" // Validated Square shape
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#004795] leading-tight group-hover:text-black transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] font-black text-black  tracking-widest mt-1 opacity-70">
                    {testimonial.grade}
                  </p>
                </div>
              </div>

              {/* Content - Pure Black text */}
              <div className="relative">
                <p className="text-black/80 italic leading-relaxed relative z-10 font-medium">
                  "{testimonial.text}"
                </p>
              </div>
              
              {/* Note: Red Stars removed per instructions */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}