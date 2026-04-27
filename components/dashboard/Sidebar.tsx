"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

const icons = {
  dashboard: "M3 13.125C3 12.5037 3.50368 12 4.125 12H9.375C9.99632 12 10.5 12.5037 10.5 13.125V20.375C10.5 20.9963 9.99632 21.5 9.375 21.5H4.125C3.50368 21.5 3 20.9963 3 20.375V13.125Z M13.5 3.625C13.5 3.00368 14.0037 2.5 14.625 2.5H19.875C20.4963 2.5 21 3.00368 21 3.625V10.875C21 11.4963 20.4963 12 19.875 12H14.625C14.0037 12 13.5 11.4963 13.5 10.875V3.625Z M3 3.625C3 3.00368 3.50368 2.5 4.125 2.5H9.375C9.99632 2.5 10.5 3.00368 10.5 3.625V8.375C10.5 8.99632 9.99632 9.5 9.375 9.5H4.125C3.50368 9.5 3 8.99632 3 8.375V3.625Z M13.5 15.625C13.5 15.0037 14.0037 14.5 14.625 14.5H19.875C20.4963 14.5 21 15.625V20.375C21 20.9963 20.4963 21.5 19.875 21.5H14.625C14.0037 21.5 13.5 20.9963 13.5 20.375V15.625Z",
  announcements: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
  gallery: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z",
  users: "M20 21v-2a4 4 0 00-3-3.87 M4 21v-2a4 4 0 013-3.87 M16 3.13a4 4 0 11-8 0 4 4 0 018 0z"
};

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 1. Check for both pieces of required data
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");

    // 2. Strict Logout if data is missing or corrupted
    if (!storedToken || !storedUser) {
      handleLogout();
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      handleLogout();
    }
  }, []);

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: icons.dashboard },
    { name: 'Gallery', href: '/admin/gallery', icon: icons.gallery },
    { name: 'Announcements', href: '/admin/announcements', icon: icons.announcements },
    { name: 'Users', href: '/admin/users', icon: icons.users },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Hard redirect to clear any cached states
    window.location.href = "/login";
  };

  const getInitials = () => {
    if (!user) return "??";
    return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen w-72 bg-[#004795] text-white shadow-[4px_0_24px_rgba(0,0,0,0.15)] relative overflow-hidden">
      
      {/* BRANDING SECTION */}
      <div className="p-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative p-1 bg-white rounded-2xl shadow-xl">
            <img 
              src="/image/logo.jpeg" 
              alt="KHS Logo" 
              className="w-24 h-24 rounded-xl object-contain bg-white"
            />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter leading-tight">
              KIGALI HARVEST <br />
              <span className="text-[#D62828]">SCHOOL</span>
            </h2>
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
            </Link>
          );
        })}
      </nav>

      {/* DYNAMIC USER CARD */}
      {/* <div className="p-4 mt-auto">
        <div className="bg-black/20 backdrop-blur-md rounded-[2rem] p-4 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-[#004795] font-black text-xs shadow-inner uppercase">
              {getInitials()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black truncate capitalize">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.5 rounded-md bg-[#E31E24] text-[8px] font-black uppercase tracking-tighter">
                  {user?.role || "..."}
                </span>
                <p className="text-[9px] text-blue-200 font-bold opacity-70 truncate tracking-tighter lowercase">
                  {user?.email || "..."}
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full mt-3 py-2.5 rounded-xl bg-white/5 hover:bg-red-600 text-blue-100 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 hover:border-transparent flex items-center justify-center gap-2"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div> */}

      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}