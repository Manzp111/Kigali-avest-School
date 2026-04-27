"use client";

import React from 'react';
import { 
  Users, 
  Target, 
  ShieldCheck, 
  GraduationCap, 
  Heart, 
  Cross, 
  Languages, 
  Music 
} from 'lucide-react';

export function WhyChoose() {
  const features = [
    {
      title: "Small Class Sizes",
      desc: "Personalized attention for every student",
      icon: <Users className="w-8 h-8 text-white" />,
      color: "bg-[#004795]" // Logo Blue
    },
    {
      title: "Individual Attention",
      desc: "Each child receives focused care and support",
      icon: <Target className="w-8 h-8 text-white" />,
      color: "bg-[#E31E24]" // Logo Red
    },
    {
      title: "Safe Environment",
      desc: "Secure campus with caring supervision",
      icon: <ShieldCheck className="w-8 h-8 text-[#004795]" />,
      color: "bg-white border-2 border-[#004795]" 
    },
    {
      title: "Strong Performance",
      desc: "Excellent academic results and students growth",
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      color: "bg-[#004795]" 
    },
    {
      title: "Caring Teachers",
      desc: "Friendly, qualified, and deeply supportive educators",
      icon: <Heart className="w-8 h-8 text-white" />,
      color: "bg-[#E31E24]"
    },
    {
      title: "Christian Values",
      desc: "Building character through faith-based education",
      icon: <Cross className="w-8 h-8 text-[#E31E24]" />,
      color: "bg-white border-2 border-[#E31E24]" 
    },
    {
      title: "Language Excellence",
      desc: "Mastery of English, French and communication skills",
      icon: <Languages className="w-8 h-8 text-white" />,
      color: "bg-[#004795]"
    },
    {
      title: "Club Activities",
      desc: "Nurturing talents in music, drama, sports and more",
      icon: <Music className="w-8 h-8 text-white" />,
      color: "bg-[#E31E24]"
    }
  ];

  return (
    <section id="why-choose" className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-blue-900 mb-4 font-bold tracking-tight">
            Why Choose Kigali Harvest School?
          </h2>
          <div className="flex justify-center gap-2">
            <div className="w-20 h-2 bg-[#E31E24] rounded-full"></div>
            <div className="w-8 h-2 bg-[#004795] rounded-full"></div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 shadow-md`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#004795] mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}