import { announcements, gallery, users } from '@/lib/db/schema';
import React from 'react';

// Using Lucide-style SVG icons for a modern feel
const icons = {
  dashboard: "M3 13.125C3 12.5037 3.50368 12 4.125 12H9.375C9.99632 12 10.5 12.5037 10.5 13.125V20.375C10.5 20.9963 9.99632 21.5 9.375 21.5H4.125C3.50368 21.5 3 20.9963 3 20.375V13.125Z M13.5 3.625C13.5 3.00368 14.0037 2.5 14.625 2.5H19.875C20.4963 2.5 21 3.00368 21 3.625V10.875C21 11.4963 20.4963 12 19.875 12H14.625C14.0037 12 13.5 11.4963 13.5 10.875V3.625Z M3 3.625C3 3.00368 3.50368 2.5 4.125 2.5H9.375C9.99632 2.5 10.5 3.00368 10.5 3.625V8.375C10.5 8.99632 9.99632 9.5 9.375 9.5H4.125C3.50368 9.5 3 8.99632 3 8.375V3.625Z M13.5 15.625C13.5 15.0037 14.0037 14.5 14.625 14.5H19.875C20.4963 14.5 21 15.0037 21 15.625V20.375C21 20.9963 20.4963 21.5 19.875 21.5H14.625C14.0037 21.5 13.5 20.9963 13.5 20.375V15.625Z",
  announcements: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z M19 21v-2a2 2 0 012-2h.01 M5 21v-2a2 2 0 012-2h.01",
  gallery: "M3 4a2 2 0 012-2h14a2 2 0 012 2v16a2 2 0 01-2 2H5a2 2 0 01-2-2V4z M3 4l7.89 5.26a1.99 1.99 0 002.22 0L21 4 M5 19l5.01-6a1.99 1.99 0 012.22 0L19 19",
  users: "M20 21v-2a4 4 0 00-3-3.87 M4 21v-2a4 4 0 013-3.87 M16 3.13a4 4 0 11-8 0 4 4 0 018 0z"
};

export function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: icons.dashboard, active: true },
    { name: 'Gallery', icon: icons.gallery },
    { name: 'Announcements', icon: icons.announcements },
    { name: 'Users', icon: icons.users },
  ];

  return (
    <div className="flex flex-col h-screen w-72 bg-slate-50 border-r border-slate-200 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
      
      {/* Header with School Image */}
      <div className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="relative">
            <img 
              
              src="/image/logo.jpeg" 
              alt="School logo" 
              className="w-20 h-20 rounded-xl object-cover shadow-sm border border-white"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">KHS</h2>
            {/* <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Portal Administration</p> */}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              item.active 
                ? 'bg-blue-800 text-white shadow-lg shadow-blue-200' 
                : 'text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'
            }`}
          >
            <svg 
              className={`w-5 h-5 transition-colors ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`}
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d={item.icon} />
            </svg>
            <span className="font-semibold text-sm">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 m-4 bg-slate-100/50 rounded-2xl border border-slate-200/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-slate-700 truncate">Admin User</p>
            <p className="text-[10px] text-slate-500 truncate">admin@khs.edu.rw</p>
          </div>
        </div>
      </div>
    </div>
  );
}