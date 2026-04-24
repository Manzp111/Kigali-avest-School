"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const icons = {
  dashboard: "M3 13.125C3 12.5037 3.50368 12 4.125 12H9.375C9.99632 12 10.5 12.5037 10.5 13.125V20.375C10.5 20.9963 9.99632 21.5 9.375 21.5H4.125C3.50368 21.5 3 20.9963 3 20.375V13.125Z M13.5 3.625C13.5 3.00368 14.0037 2.5 14.625 2.5H19.875C20.4963 2.5 21 3.00368 21 3.625V10.875C21 11.4963 20.4963 12 19.875 12H14.625C14.0037 12 13.5 11.4963 13.5 10.875V3.625Z M3 3.625C3 3.00368 3.50368 2.5 4.125 2.5H9.375C9.99632 2.5 10.5 3.00368 10.5 3.625V8.375C10.5 8.99632 9.99632 9.5 9.375 9.5H4.125C3.50368 9.5 3 8.99632 3 8.375V3.625Z M13.5 15.625C13.5 15.0037 14.0037 14.5 14.625 14.5H19.875C20.4963 14.5 21 15.625V20.375C21 20.9963 20.4963 21.5 19.875 21.5H14.625C14.0037 21.5 13.5 20.9963 13.5 20.375V15.625Z",
  announcements: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
  gallery: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
  users: "M20 21v-2a4 4 0 00-3-3.87 M4 21v-2a4 4 0 013-3.87 M16 3.13a4 4 0 11-8 0 4 4 0 018 0z"
};

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: icons.dashboard },
    { name: 'Gallery', href: '/admin/gallery', icon: icons.gallery },
    { name: 'Announcements', href: '/admin/announcements', icon: icons.announcements },
    { name: 'Users', href: '/admin/users', icon: icons.users },
  ];

  return (
    <div className="flex flex-col h-screen w-72 bg-[#004795] text-white shadow-[4px_0_24px_rgba(0,0,0,0.15)] relative overflow-hidden">
      
      {/* Red Accent Top Bar (Matches Logo Red) */}
      {/* <div className="h-1.5 w-full bg-[#E31E24]"></div> */}

      {/* BRANDING SECTION */}
      <div className="p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative p-1 bg-white rounded-2xl shadow-xl ">
            <img 
              src="/image/logo.jpeg" 
              alt="KHS Logo" 
              className="w-24 h-24 rounded-xl object-contain bg-white"
            />
            {/* Online Status Indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 border-[#004795] rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter leading-tight">
              KIGALI HARVEST <br />
              <span className="text-[#D62828]">SCHOOL</span>
            </h2>
            {/* <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-200 mt-1 opacity-80">
              Admin Portal
            </p> */}
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-2 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
        <Link
          key={item.name}
          href={item.href}
          className={`group flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
            isActive 
              ? 'bg-white text-[#004795] shadow-lg shadow-black/20' 
              : 'text-blue-50 hover:bg-white/10 hover:translate-x-1'
          }`}
        >
          <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
            <svg 
              className={`w-5 h-5 ${isActive ? 'text-[#004795]' : 'text-blue-300'}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d={item.icon} />
            </svg>
          </div>

          <span className={`text-sm font-bold tracking-wide ${isActive ? 'opacity-100' : 'opacity-90'}`}>
            {item.name}
          </span>
          
          {/* Active Indicator - Re-enabled and Styled with School Red */}
          {isActive && (
            <div className="ml-auto w-1.5 h-6  rounded-full animate-in fade-in slide-in-from-right-1 duration-500"></div>
          )}
        </Link>
          );
        })}
      </nav>

      {/* FOOTER USER CARD */}
      <div className="p-4 mt-auto">
        <div className="bg-black/20 backdrop-blur-md rounded-[2rem] p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-[#004795] font-black text-sm shadow-inner">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate">KHS Administrator</p>
              <p className="text-[9px] text-blue-200 font-bold opacity-70 truncate uppercase tracking-tighter">
                kigaliharvestschool@yahoo.fr
              </p>
            </div>
          </div>
          
          <button className="w-full mt-3 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-blue-100 text-[10px] font-black uppercase tracking-widest transition-colors border border-white/5 hover:border-red-500/30">
            Sign Out
          </button>
        </div>
      </div>

      {/* Subtle Background Pattern (Harvest Theme) */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}