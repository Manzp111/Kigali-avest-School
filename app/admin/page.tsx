"use client";

import { useEffect, useState } from "react";
import { 
  ImageIcon, 
  Megaphone, 
  Users, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  Activity,
  FileText,
  ShieldCheck
} from "lucide-react";
import { apiClient } from "@/lib/utils/apiClient";

export default function DashboardPage() {
  const [gallery, setGallery] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMeta, setUserMeta] = useState({ total: 0 });
  const [announcements, setAnnouncements] = useState([]);
  const [announcementMeta, setAnnouncementMeta] = useState({ total: 0 });
  const [loading, setLoading] = useState(true);

  // Status Logic for Announcements
  const publishedCount = announcements.filter((a: any) => a.isPublished).length;
  const draftCount = announcements.filter((a: any) => !a.isPublished).length;

useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch all data in parallel using your apiClient
        // These already return the parsed JSON objects.
        const [gData, uData, aData] = await Promise.all([
          apiClient("/api/gallery"),
          apiClient("/api/auth/users"),
          apiClient("/api/announcement"),
        ]);

        // 2. Set Gallery (Checking if gData is the array or contains a data key)
        setGallery(Array.isArray(gData) ? gData : gData?.data || []); 

        // 3. Set Users and Metadata
        // Adjusting based on your typical 'success' wrapper structure
        if (uData) {
          setUsers(uData.users || uData.data || []); 
          setUserMeta(uData.meta || { total: uData.users?.length || 0 });
        }

        // 4. Set Announcements and Metadata
        if (aData) {
          setAnnouncements(aData.data || aData.announcements || []);
          setAnnouncementMeta({ total: aData.total || aData.data?.length || 0 });
        }

      } catch (err) {
        // console.error("Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#004795] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black text-[#004795] animate-pulse uppercase tracking-widest text-[10px]">Loading School Data...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 bg-slate-50 min-h-screen space-y-8">
      
      {/* --- STATS GRID (LOGOTYPE COLORS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Users (Harvest Blue & White) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group overflow-hidden">
          <div className="relative z-10">
            <div className="bg-[#e0f0ff] text-[#004795] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <p className="font-black text-black-400 text-[20px] tracking-widest">Total Accounts</p>
            <h2 className="text-5xl font-black text-black">{userMeta.total}</h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#004795] rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-[#004795] text-[20px]">Verified Registry</span>
            </div>
          </div>
          <Users className="absolute -bottom-8 -right-8 w-40 h-40 text-slate-50 group-hover:text-[#e0f0ff] transition-colors duration-500" />
        </div>

        {/* Announcement Metrics (Primary Blue Brand) */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-[#e0f0ff] text-[#004795] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <Megaphone className="w-7 h-7" />
            </div>
            <p className="font-black text-black text-[20px] tracking-widest">Global Notices</p>
            <h2 className="text-5xl font-black mb-6 text-black">{announcementMeta.total}</h2>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-blue-800 ">Published</span>
                <span className="text-xl font-black text-black">{publishedCount}</span>
              </div>
              <div className="w-px h-8 bg-white/20 self-end"></div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-blue-800  ">Drafts</span>
                <span className="text-xl font-black text-black">{draftCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assets (Pure Black Brand) */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-white relative group overflow-hidden">
          <div className="relative z-10">
            <div className="bg-[#e0f0ff] text-[#004795] w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
              <ImageIcon className="w-7 h-7" />
            </div>
            <p className="text-[20px] font-black text-black  tracking-widest">Gallery</p>
            <h2 className="text-5xl font-black text-black">{gallery.length}</h2>
            <p className="text-[10px] text-[#004795] mt-4 font-black uppercase tracking-widest">Gallery Live</p>
          </div>
          {/* <ShieldCheck className="absolute -bottom-8 -right-8 w-40 h-40 text-[#004795] opacity-[0.03]" /> */}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* --- LEFT: DYNAMIC LISTS (SLICED TO 4) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Gallery Preview */}
          <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white">
              <h3 className="font-black text-[#004795] uppercase tracking-widest text-[11px] flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Gallery <span className="text-slate-200">|</span> Showing 4 of {gallery.length}
              </h3>
              <button className="text-[10px] font-black text-slate-400 hover:text-[#004795] transition-colors">EXPLORE ALL</button>
            </div>
            <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.slice(0, 4).map((item: any) => (
                <div key={item.id} className="aspect-square rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all group relative">
                  <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-[#004795]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>

          {/* User Activity Feed */}
          <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50">
              <h3 className="font-black text-[#004795] uppercase tracking-widest text-[11px] flex items-center gap-2">
                <Activity className="w-4 h-4" /> Recent Access <span className="text-slate-200">|</span> Showing 4 of {userMeta.total}
              </h3>
            </div>
            <div className="divide-y divide-slate-50">
              {users.slice(0, 4).map((user: any) => (
                <div key={user.id} className="px-8 py-5 flex items-center justify-between hover:bg-[#e0f0ff]/30 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-black text-sm group-hover:bg-[#004795] transition-all">
                      {user.firstName.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-black">{user.firstName} {user.lastName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{user.role} <span className="mx-1">•</span> {user.phone}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[9px] font-black text-slate-300 uppercase">Registered</span>
                    <span className="text-[11px] font-bold text-black opacity-70">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- RIGHT: BROADCASTS --- */}
        <div className="space-y-8">
          <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50">
              <h3 className="font-black text-[#004795] uppercase tracking-widest text-[11px] flex items-center gap-2">
                <FileText className="w-4 h-4" /> Live Broadcasts ({announcementMeta.total})
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {announcements.slice(0, 4).map((a: any) => (
                <div key={a.id} className={`p-6 rounded-[2rem] border transition-all ${a.isPublished ? 'bg-slate-50 border-slate-100' : 'bg-amber-50/20 border-amber-100 border-dashed'}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg uppercase ${a.isPublished ? 'bg-[#e0f0ff] text-[#004795]' : 'bg-slate-200 text-slate-500'}`}>
                      {a.isPublished ? 'Active' : 'Draft'}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                  <h4 className="text-sm font-black text-black mb-1 leading-tight">{a.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{a.message}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Branded Quick Action */}
          {/* <div className="bg-[#004795] p-8 rounded-[3rem] shadow-xl text-white">
            <div className="flex justify-between items-start mb-4">
              <Plus className="w-8 h-8 opacity-50" />
              <ArrowUpRight className="w-5 h-5 opacity-50" />
            </div>
            <h4 className="font-black text-xl mb-2">Publish Now</h4>
            <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest mb-6">Create new visibility for the school</p>
            <button className="w-full bg-white text-[#004795] py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
              Compose Notice
            </button>
          </div> */}
        </div>

      </div>
    </div>
  );
}