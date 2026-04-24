"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function DashboardPage() {
  const [gallery, setGallery] = useState([]);
  const [users, setUsers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gRes, uRes, aRes] = await Promise.all([
          fetch("/api/gallery"),
          fetch("/api/auth/users"),
          fetch("/api/announcement"),
        ]);

        const gData = await gRes.json();
        const uData = await uRes.json();
        const aData = await aRes.json();

        // Increased slice to 4 as requested
        setGallery(gData.slice(0, 4));
        setUsers(uData.data?.slice(0, 4) || []);
        setAnnouncements(aData.data?.slice(0, 4) || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-400">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-medium animate-pulse">Synchronizing Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-10">
      
      {/* HEADER WITH BRANDING */}
      <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
        <div className="relative w-16 h-16">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            fill 
            className="object-contain"
          />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Live Dashboard
          </h2>
          <p className="text-slate-500 font-medium italic">
            Kigali Harvest School Overview
          </p>
        </div>
      </div>

      {/* VERTICAL SECTIONS STACK */}
      <div className="flex flex-col gap-8">

        {/* 🖼️ RECENT GALLERY SECTION */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <span className="text-lg">🖼️</span> Recent Gallery Uploads
            </h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase">Live</span>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-h-[160px]">
            {gallery.length > 0 ? gallery.map((item: any) => (
              <div key={item.id} className="flex flex-col gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full rounded object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 truncate">{item.title}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {item.type}
                  </p>
                </div>
              </div>
            )) : <p className="text-slate-400 text-sm col-span-full italic">No recent images found.</p>}
          </div>
        </section>

        {/* 📢 RECENT ANNOUNCEMENTS SECTION */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <span className="text-lg">📢</span> Latest Announcements
            </h3>
            <a href="/admin/announcements" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase">View All</a>
          </div>
          <div className="p-2 min-h-[200px]">
            {announcements.length > 0 ? announcements.map((a: any) => (
              <div key={a.id} className="p-4 hover:bg-blue-50/50 rounded-2xl transition-colors flex items-start gap-4 group">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 group-hover:scale-125 transition-transform"></div>
                <div>
                  <p className="text-base font-bold text-slate-800">{a.title}</p>
                  <p className="text-sm text-slate-500 line-clamp-1">
                    {a.message}
                  </p>
                </div>
              </div>
            )) : <p className="p-6 text-slate-400 text-sm italic">No active announcements.</p>}
          </div>
        </section>

        {/* 👥 RECENT USERS SECTION */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <span className="text-lg">👥</span> Access Management (Recent Users)
            </h3>
          </div>
          <div className="divide-y divide-slate-50 min-h-[150px]">
            {users.length > 0 ? users.map((user: any) => (
              <div key={user.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {user.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{user.email}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Registered Account</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase ${
                  user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {user.role}
                </span>
              </div>
            )) : <p className="p-6 text-slate-400 text-sm italic">No users registered recently.</p>}
          </div>
        </section>

      </div>
    </div>
  );
}