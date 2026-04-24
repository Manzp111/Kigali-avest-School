"use client";

import React from 'react';

export function Navbar() {
  return (
    <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40">
      
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col">
        <h1 className="text-xl font-black text-[#004795] tracking-tight flex items-center gap-2">
          Dashboard
          <span className="text-slate-300 font-light text-lg">/</span>
          <span className="text-slate-400 text-sm font-medium">Overview</span>
        </h1>
        <p className="text-[11px] text-[#E31E24] font-bold uppercase tracking-widest">
          Kigali Harvest School System
        </p>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        
        {/* Modern Search Bar - Themed */}
        <div className="hidden lg:flex items-center relative group">
          <span className="absolute left-4 text-slate-400 group-focus-within:text-[#004795] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-4 focus:ring-[#004795]/5 focus:bg-white focus:border-[#004795]/20 transition-all w-72 outline-none text-slate-700 font-medium"
          />
        </div>

        {/* Notifications - Red Badge matching Logo */}
        <button className="relative p-2.5 text-slate-400 hover:bg-slate-50 rounded-xl transition-all group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-[#004795] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-[#E31E24] border-2 border-white rounded-full animate-pulse"></span>
        </button>

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-slate-100 mx-1"></div>

        {/* User Profile - Amber/Gold accents */}
        <div className="flex items-center gap-4 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[#004795] leading-none group-hover:text-[#E31E24] transition-colors">Administrator</p>
            <p className="text-[10px] text-amber-500 font-black uppercase tracking-tighter mt-1">Super User</p>
          </div>
          
          <div className="w-11 h-11 rounded-2xl bg-amber-400 flex items-center justify-center text-[#004795] font-black text-lg shadow-lg shadow-amber-100 group-hover:scale-105 transition-transform border-2 border-white">
            A
          </div>
        </div>

      </div>
    </header>
  );
}