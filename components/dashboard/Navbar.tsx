import React from 'react';

export function Navbar() {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Page Title & Breadcrumb feel */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Dashboard</h1>
        <p className="text-xs text-slate-500 font-medium">Welcome back, Administrator</p>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        
        {/* Modern Search Bar */}
        <div className="hidden md:flex items-center relative">
          <span className="absolute left-3 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search students, files..." 
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all w-64 outline-none text-slate-600"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-[1px] bg-slate-200"></div>

        {/* User Profile Dropdown Trigger */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none">Admin</p>
            <p className="text-[11px] text-blue-600 font-semibold">Superuser</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-100">
            A
          </div>
        </div>

      </div>
    </header>
  );
}