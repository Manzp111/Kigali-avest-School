"use client";

import React, { useEffect, useState } from 'react';

export function Navbar() {
  const [user, setUser] = useState<any>(null);


  const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  window.location.href = "/login";
};

  useEffect(() => {
    // Retrieve user data for personalization
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data");
      }
    }
  }, []);

  // Helper for Initials (e.g., Martin Mbasabagukizwa -> MM)
  const getInitials = () => {
    if (!user) return "A";
    return `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    // <header className="h-20 bg-white/90 backdrop-blur-xl border-b border-slate-50 px-8 flex items-center justify-between sticky top-0 z-40">
<header className="h-20 bg-white/70 backdrop-blur-xl shadow-md px-8 flex items-center justify-between sticky top-0 z-40">      <div className="flex flex-col">
        <h1 className="text-xl font-black text-[#004795] tracking-tight flex items-center gap-2">
          Dashboard
          <span className="text-slate-300 font-light text-lg">/</span>
          <span className="text-slate-400 text-sm font-medium">Overview</span>
        </h1>
        {/* <p className="text-[11px] text-[#E31E24] font-bold uppercase tracking-widest">
          Kigali Harvest School System
        </p> */}
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        
     

        {/* Vertical Divider */}
        <div className="h-10 w-[1px] bg-slate-100 mx-1"></div>

        {/* DYNAMIC USER PROFILE */}
        {/* <div className="flex items-center gap-4 pl-2 cursor-pointer group"> */}
        <div className="relative flex items-center gap-4 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-[#004795] leading-none group-hover:text-[#E31E24] transition-colors capitalize">
              {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
            </p>
            <p className="text-[10px] text-black font-black uppercase tracking-tighter mt-1">
              {user?.role || "Visitor"}
            </p>
          </div>
          
          <div className="w-11 h-11 rounded-full bg-[#004795] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-amber-100 group-hover:scale-105 transition-transform border-2 border-white">
            {getInitials()}
          </div>
          <div className="absolute right-0 top-14 w-40 bg-white rounded-xl shadow-xl border border-slate-100 
  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
  transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
  
  <button
    onClick={handleLogout}
    className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition"
  >
    Logout
  </button>
</div>
        </div>

      </div>
    </header>
  );
}